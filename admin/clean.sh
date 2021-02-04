#!/bin/bash

export ADMIN_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
source "${ADMIN_DIR}"/init.sh

echo "You are about to clean ALL logs. This CANNOT be undone."
read -p "Are you absolutely sure you want to proceed? (y/n): " -r
if [[ $REPLY =~ ^[Yy]$ ]]
then
    rm "${LOGS_DIR}"/backend.log 2> /dev/null
    echo -e "\n${GREEN}All Development Card Simulator log data deleted${RESET}"
fi
