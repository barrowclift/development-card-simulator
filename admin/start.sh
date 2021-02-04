#!/bin/bash

export ADMIN_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
source "${ADMIN_DIR}"/init.sh

if [ ! -d "$LOGS_DIR" ]; then
    mkdir "$LOGS_DIR";
fi

if [ "$USE_PM2" = true ]; then
    SERVER_RUNNING=$(pm2 pid developmentCardSimulator)
    if [ "$SERVER_RUNNING" = "0" ]; then
        SERVER_RUNNING=""
    fi
else
    SERVER_RUNNING=$(ps -ef | grep "node ""${ADMIN_DIR}" | grep -v grep)
fi

if [ -n "$SERVER_RUNNING" ]; then
    echo -e "Development Card Simulator already running"
else
    if [ "$USE_PM2" = true ] ; then
        pm2 --log "${LOGS_DIR}"/backend.log --name developmentCardSimulator --silent start "${ADMIN_DIR}"/main.js
    else
        nohup node "${ADMIN_DIR}"/main.js > "$LOGS_DIR"/backend.log 2>&1 &
    fi

    SUCCESS=$?
    if [ $SUCCESS -eq 0 ]; then
        echo -e "${GREEN}Development Card Simulator started${RESET}"
        exit 0
    else
        echo -e "${RED}Development Card Simulator failed to start${RESET}"
        exit 1
    fi
fi
