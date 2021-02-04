# Development Card Simulator

### *The "Settlers of Catan" Development Card deck simulator*

This is a small web app to establish a virtual Development Card deck for you and friends or family to use while playing a game of "Settlers of Catan" remotely. It's as simple as can be; only one game can run at any given time for a given instance and anyone with the password you (the admin) set in advance may join.

This light app offers both light...

<picture><source type="image/webp" srcset="https://dropbox.barrowclift.me/assets/projects/code/development-card-simulator/light-screenshot.webp"><img type="image/png" src="https://dropbox.barrowclift.me/assets/projects/code/development-card-simulator/light-screenshot.png" /></picture>

And dark variants (depending on your system's theme)

<picture><source type="image/webp" srcset="https://dropbox.barrowclift.me/assets/projects/code/development-card-simulator/dark-screenshot.webp"><img type="image/png" src="https://dropbox.barrowclift.me/assets/projects/code/development-card-simulator/dark-screenshot.png" /></picture>

## Setup

### Dependencies

* A VM or local computer to act as your server
* A modern version of [Node](https://nodejs.org/en/) (14.15.4 or later)
* A modern version of [npm](https://www.npmjs.com/get-npm) (7.4.3 or later)

### Required Configuration

After cloning or downloading the latest version of this repo:

* Set a reasonable session password for `frontend.password` in `backend/resources/catan.properties`. This is plain text server-side, so obviously don't reuse any passwords for this.
* If you're deploying the app to a "prod" environment, set your address for `public.url` in `backend/resources/catan.properties`. If you're just doing local development & testing, you can skip this step.
* Execute `npm install` in the project directory to pull all dependencies

### Starting & Stopping

Execute either `start.sh` (to startup the service) or `stop.sh` (to stop the service). Be sure to check the `logs` directory if it's your first time running the app to observe any potential startup errors

## Why a virtual, shared development card deck? Why not let everyone use their own decks?

Development cards are already [fairly powerful](https://boardgamegeek.com/thread/151481/he-who-has-development-cards-wins) for "real" in-person Catan games, but having each player use their own deck for remote games has two critical issues:

* It radically throws off the Development Card deck balance
* The state of unplayed and played Development Cards for other players is no longer accessible public knowledge

For example, let's focus on the 5 Victory Point cards in every standard 25 card Development deck; For "real" games, that puts a player sitting at a solid 20% chance of drawing a Victory Point as their their first development card. For each subsequent draw done by yourself or other players, that chance will fluctuate, either going up (if cards other than Victory Points are drawn) or down (if the remaining Victory Points are getting drawn).

However, for remote games, those odds don't fluctuate with other players' draws, *only yours*. So say three other players draw development cards prior to you, and each of them were extraordinarily lucky to draw a Victory Point. For "real" games, that means you'd only have a 9.09% chance of drawing one of the remaining Victory Points, but for remote games that chance is still the default (20%) because nobody has yet drawn from *your* deck.

[Others have tried addressing this](https://www.reddit.com/r/Catan/comments/l9571v/remote_play/glg93wk/) by choosing a player's deck as the "real" one and having them close their eyes, draw, and hold it up to the camera when another player builds one, but that doesn't address the not knowing the state of unplayed and played development cards for other players. You either need to write it down yourself or ask occasionally, not ideal.

This projects sets out to provide a centralized, friendly website that addresses both of those critical issues in remote Catan play.

## Caveat regarding player names

The provided name on login is used to uniquely identify players, so if you wish to run a game that happens to have two people that both provide the same name, they'll both be treated as "the same" player. This was a trade-off made for a few reasons:

* It allows users to drop off (loss of internet connection, phone dies, etc.) while still allowing them to easily hop back on to regain their hand. This can also be achieved with individual "real" accounts, but is far too complex for something this simple.
* Hopping onto a current game is trivial and quick: all you need to do is provide a unique name and the simulator's password, that's it. No account creation required.
* Nobody I play a game with shares a name with anyone else, so it was a personal non-issue.
