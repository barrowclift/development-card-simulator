#!/bin/bash

export RED='\033[0;31m'
export RESET='\033[0m'
export YELLOW='\033[0;33m'
export GREEN='\033[0;32m'

export REPO=$(dirname "${ADMIN_DIR}")
export FRONTEND_STATIC_DIR="${REPO}"/frontend/static
export FRONTEND_LIQUID_DIR="${REPO}"/frontend/liquid
export BACKEND_DIR="${REPO}"/backend
export LOGS_DIR="${REPO}"/logs

export USE_PM2=true