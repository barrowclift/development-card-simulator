#!/bin/bash

export ADMIN_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
source "${ADMIN_DIR}"/init.sh

if [ "$USE_PM2" = true ]; then
    SERVER_RUNNING=$(pm2 pid developmentCardSimulator)
    if [ "$SERVER_RUNNING" = "0" ]; then
        SERVER_RUNNING=""
    fi
else
    SERVER_RUNNING=$(ps -ef | grep "node ""${ADMIN_DIR}" | grep -v grep)
fi

if [ -n "$SERVER_RUNNING" ]; then
    if [ "$USE_PM2" = true ] ; then
        pm2 --silent stop developmentCardSimulator
    else
        ps -ef | grep "node ""${ADMIN_DIR}""/main.js" | grep -v grep | awk '{print $2}' | xargs kill -9
    fi

    SUCCESS=$?
    if [ $SUCCESS -eq 0 ]; then
        echo -e "${GREEN}Development Card Simulator stopped${RESET}"
        exit 0
    else
        echo -e "${RED}Development Card Simulator failed to stop${RESET}"
        exit 1
    fi
else
    echo "Development Card Simulator is not running"
    exit 0
fi
