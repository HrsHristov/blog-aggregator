import fs from "fs";
import os, { homedir } from "os";
import path from "path";

type Config = {
    dbUrl: string;
    currentUserName: string;
};

export function setUser(userName: string) {
    const config = readConfig();
    config.currentUserName = userName;
    writeConfig(config);
}

export function readConfig() {
    const fullPath = getConfigFilePath();

    const data = fs.readFileSync(fullPath, "utf-8");
    const rawConfig = JSON.parse(data);

    return ValidateConfig(rawConfig);
}

function writeConfig(config: Config) {
    const fullPath = getConfigFilePath();
    const rawConfig = {
        db_url: config.dbUrl,
        current_user_name: config.currentUserName,
    };

    fs.writeFileSync(fullPath, JSON.stringify(rawConfig, null, 2), "utf-8");

    return rawConfig;
}

function getConfigFilePath() {
    const configFileName = ".gatorconfig.json";
    const homeDir = os.homedir();
    return path.join(homeDir, configFileName);
}

function ValidateConfig(rawConfig: any) {
    if (!rawConfig.db_url || typeof rawConfig.db_url !== "string") {
        throw new Error("Invalid configuration: db_url is required.");
    }

    if (
        !rawConfig.current_user_name ||
        typeof rawConfig.current_user_name !== "string"
    ) {
        throw new Error(
            "Invalid configuration: current_user_name is required."
        );
    }

    const config: Config = {
        dbUrl: rawConfig.db_url,
        currentUserName: rawConfig.current_user_name,
    };
    return config;
}
