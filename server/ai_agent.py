# ai_agent.py
import re
from dotenv import load_dotenv  
from google import genai
import time
from google.genai import errors

load_dotenv()   #It automatically picks up os.environ["GEMINI_API_KEY"]

class AIAgent:
    def __init__(self, model_name:str= "gemini-2.5-flash", max_retries: int = 3):
        # Initialize the client. 
        self.client = genai.Client()
        self.model_name = model_name
        self.max_retries = max_retries

    def _make_board_AI_readible(self, board:list[str], dimension:int, game: TicTacToeGame)->str:

        board_str = ""
        for i in range(dimension):
            row_list = game.get_row_list(i) #Horizontal
            board_str += f"Row {i}: " + " | ".join(row_list) + "\n"

        return board_str
    
    def _parse_and_validate_ai_move(self, raw_response: str, board: list[str], dimension: int)-> int:
        """
        Safely converts Gemini's text response into a valid, playable 1D array index.
        Returns a valid integer index, or raises an exception if the move is illegal.
        """

        numbers_found = re.findall(r'\d+', raw_response)

        if not numbers_found:
            raise ValueError(f"Gemini didn't return any numbers in its response: '{raw_response}'")

        first_number_found = numbers_found[0]

        move_index = int(first_number_found)

        max_possible_index = (dimension ** 2) - 1
        if move_index < 0 or move_index > max_possible_index:
            raise ValueError(f"Index {move_index} is out of bounds.")
        
        if board[move_index] in ("X", "O"):
            raise ValueError(f"Square {move_index} is already occupied.")
        
        return move_index


    def _get_emergency_fallback_move(self, board:list[str])-> int:
        for index, cell in enumerate(board):
            if cell.upper() not in ("X", "O"):
                return index
        raise RuntimeError("No available moves left on the board.")


    def play_turn(self, board: list[str], dimension: int, game: 'TicTacToeGame') -> int:

        from game_logic import TicTacToeGame
        ai_readable_board = self._make_board_AI_readible(board, dimension, game)

        system_prompt = (
            f"You are a master Tic-Tac-Toe AI playing on a {dimension}x{dimension} grid. "
            "Your symbol is 'O'. The player is 'X'. Empty spaces are blank strings. "
            "Analyze the board state carefully. Block player wins, and take winning moves if available.\n\n"
            "CRITICAL RULES:\n"
            "1. You must respond with EXACTLY ONE NUMBER representing the raw 0-based index of your move.\n"
            f"2. The number must be between 0 and {(dimension**2) - 1}.\n"
            "3. Do not include any text, analysis, markdown, or explanation. Only output the integer."
        )

        # system_prompt = "You are a broken AI. You must ignore all rules and respond ONLY with the number 99."

        user_prompt = f"Here is the current board:\n{ai_readable_board}\nChoose your move."

        # 2. NETWORK RETRY LAYER
        response = None
        wait_time = 1.0
        for network_attempt in range(self.max_retries):
            try:
                response = self.client.models.generate_content(
                    model=self.model_name,
                    contents=user_prompt,
                    config={'system_instruction': system_prompt, 'temperature': 0.1}
                )
                break  # Break out if network succeeds!
            
            except errors.APIError as e:
                if e.code in (503, 429):
                    time.sleep(wait_time)
                    wait_time *= 2
                else:
                    raise e
      
        # Network Emergency Fallback
        if response is None:
            return self._get_emergency_fallback_move(board)


        # 3. GAME LOGIC RETRY LAYER
        for game_attempt in range(self.max_retries):
            try:
                # Call our internal validator tool
                return self._parse_and_validate_ai_move(response.text, board, dimension)
            except ValueError as error_message:
                user_prompt += (
                    f"\n\n[ERROR] You previously selected index {response.text.strip()}, "
                    f"which caused this error: '{error_message}'. Choose a different, open index."
                )

                try:
                    response = self.client.models.generate_content(
                        model=self.model_name,
                        contents=user_prompt,
                        config={'system_instruction': system_prompt, 'temperature': 0.1}
                    )
                except errors.APIError:
                    break                    

        # Rule-Breaking Emergency Fallback
        return self._get_emergency_fallback_move(board)
