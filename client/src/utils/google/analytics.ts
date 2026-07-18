import ReactGA from "react-ga4";

export const initGA = () => {
    ReactGA.initialize("G-2ZTW3LDQG6");
}

export const logPageView = (url:string) => {
    ReactGA.send({hitType: "pageview", page: url});
}