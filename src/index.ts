import { readConfig, setUser } from "./config";

function main() {
    setUser("Hristo");
    const cfg = readConfig();

    // console.log("Test result:", setUser("Hristo"));
    console.log("Config:", cfg);
}

main();
