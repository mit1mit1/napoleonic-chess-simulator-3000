<script lang="ts">
import { ChessPieces, Locations, Players, allLocations, Languages } from "@/types";
import type { ChessState } from "@/types";
import { chessBoardLength, normalStartingChessBoard } from "@/constants";
import { getGreediestMove, hasPieceOfColor, isValidMove, getStateAfterMove, getVictor, getFischerBoard } from "@/utils/chess";
import { defineComponent } from "vue";
import ChessPieceFigure from "./ChessPieceFigure.vue";
import TranslatableText from "./TranslatableText.vue";
import { getNthPrime } from "@/utils/math";
import { Player } from "tone";
const length = 400;
let selectedSquareX = -1;
let selectedSquareY = -1;
let startedGame = false;
let startOfTurn = new Date();
let completedTurnsTimes = {
    [Players.White]: 0,
    [Players.Black]: 0,
};

const getStateFromLocation = (attackedLocation: Locations, playerLocationWins: number) => {
    const locationIndex = allLocations.indexOf(attackedLocation);
    const randomiser = getNthPrime((locationIndex * 20) + playerLocationWins + 5);
    return {
        squares: getFischerBoard(randomiser),
        currentPlayer: Players.White,
        kingsMoved: [],

    } as ChessState;
}

const getAiPlayersFromLocation = (attackedLocation: Locations, playerLocationWins: number) => {
    const locationIndex = allLocations.indexOf(attackedLocation);
    return (playerLocationWins + locationIndex) % 2 ? [Players.Black] : [Players.White];
}

const lightSquareColor = "#fcf9e6";
const darkSquareColor = "#c7b3a3";
let isAttemptingAiMove = false;
export default defineComponent({
    props: {
        onVictory: Function,
        attackedLocation: String,
        playerLocationWins: Number,
    },

    data(props) {
        const chessState = getStateFromLocation((props.attackedLocation || "") as Locations, props.playerLocationWins ?? 0);
        const aiPlayers = getAiPlayersFromLocation((props.attackedLocation || "") as Locations, props.playerLocationWins ?? 0);
        return {
            length, chessState, selectedSquareX, selectedSquareY, ChessPieces, Players, lightSquareColor,
            darkSquareColor, squareIndicies: [...Array(chessBoardLength).keys()], aiPlayers, startedGame,
            chessBoardLength, isAttemptingAiMove, attackedLocation: props.attackedLocation, startOfTurn, completedTurnsTimes, Languages,
        }
    },

    methods: {
        handleSquareClick(x: number, y: number) {
            if (!this.startedGame) {
                this.startedGame = true;
                this.startOfTurn = new Date();
            }
            if (this.aiPlayers.includes(this.chessState.currentPlayer)) {
                this.attemptAIMove();
                return;
            }
            const isPieceSelected = () => {
                return hasPieceOfColor(this.selectedSquareX, this.selectedSquareY, this.chessState.currentPlayer, this.chessState.squares)
            }
            const hasPlayersPiece = () => {
                return hasPieceOfColor(x, y, this.chessState.currentPlayer, this.chessState.squares)
            }
            if (isPieceSelected()) {
                if (isValidMove({ squares: this.chessState.squares, kingsMoved: [], currentPlayer: this.chessState.currentPlayer }, this.selectedSquareX, this.selectedSquareY, x, y)) {
                    this.makeMove(x, y);
                }
            }
            if (hasPlayersPiece()) {
                this.selectedSquareX = x;
                this.selectedSquareY = y;
            }
            setTimeout(this.attemptAIMove, 1);
        },
        makeMove(x: number, y: number) {
            this.completedTurnsTimes[this.chessState.currentPlayer] += ((new Date()).getTime() - this.startOfTurn.getTime());
            this.chessState = getStateAfterMove(this.chessState, this.selectedSquareX, this.selectedSquareY, x, y);
            this.selectedSquareX = -1;
            this.selectedSquareY = -1;
            this.startOfTurn = new Date();
            setTimeout(() => {
                const victor = getVictor(this.chessState)
                if (victor) {
                    if (this.onVictory) {
                        if (victor === "tie") {
                            this.onVictory(victor);
                        } else {
                            this.onVictory(this.aiPlayers.includes(victor) ? "enemy" : "napoleon")
                        }
                    }
                }
            }, 1);
        },
        async attemptAIMove() {
            if (this.aiPlayers.includes(this.chessState.currentPlayer) && !this.isAttemptingAiMove) {
                this.isAttemptingAiMove = true;
                let greediestMove = undefined as undefined | {
                    startX: number,
                    startY: number,
                    endX: number,
                    endY: number,
                    moveValue: number | undefined,
                };
                for (let i = 0; i < chessBoardLength; i++) {
                    for (let j = 0; j < chessBoardLength; j++) {
                        await new Promise(resolve => setTimeout(() => {
                            // the player can spend resources to change the probability of looking forward (0.95)
                            greediestMove = getGreediestMove(this.chessState, 0, 2, 0.95, greediestMove, { minX: i, minY: j, maxX: i + 1, maxY: j + 1 });
                            resolve(undefined);
                        }, 10));
                    }
                }
                if (isValidMove(this.chessState, greediestMove?.startX ?? -1, greediestMove?.startY ?? -1, greediestMove?.endX ?? -1, greediestMove?.endY ?? -1)) {
                    this.selectedSquareX = greediestMove?.startX ?? -1;
                    this.selectedSquareY = greediestMove?.startY ?? -1;
                    this.makeMove(greediestMove?.endX ?? -1, greediestMove?.endY ?? -1);
                }
                this.isAttemptingAiMove = false;
            }
        }
    },

    components: {
        ChessPieceFigure, TranslatableText
    }
});
</script>

<template>
    <div class="boardScreen">
        <svg :height="length" :width="length" class="boardSVG">
            <g v-for="x in squareIndicies" v-bind:key="`row-${x}`">
                <g :class="!(aiPlayers.includes(chessState.currentPlayer) && startedGame) && 'chessSquare'"
                    :onClick="() => handleSquareClick(x, y)" v-for="y in squareIndicies"
                    v-bind:key="`square-${x}-${y}`">
                    <rect :height="length / chessBoardLength" :width="length / chessBoardLength"
                        :x="x * length / chessBoardLength" :y="y * length / chessBoardLength"
                        :fill="((x + y) % 2) ? darkSquareColor : lightSquareColor" />
                    <rect :height="(length * 0.9) / chessBoardLength" :width="(length * 0.9) / chessBoardLength"
                        :x="(x + 0.05) * length / chessBoardLength" :y="(y + 0.05) * length / chessBoardLength"
                        :fill="selectedSquareX === x && selectedSquareY === y ? '#a34b9a' : 'transparent'" />

                    <g v-if="chessState.squares[x] && chessState.squares[x][y]?.piece"
                        :transform="`translate(${x * length / chessBoardLength + 2}, ${y * length / chessBoardLength})`">
                        <ChessPieceFigure :piece="chessState.squares[x][y]?.piece"
                            :player="chessState.squares[x][y]?.player" />
                    </g>
                </g>
            </g>
        </svg>
        <div class="game-text">

            <div class="loadingMessage" v-if="aiPlayers.includes(chessState.currentPlayer) && startedGame">
                <TranslatableText :from-language="Languages.French" :to-language="Languages.English" text="Penser..." />
            </div>
            <div class="loadingMessage" v-if="aiPlayers.includes(chessState.currentPlayer) && !startedGame">
                <TranslatableText :from-language="Languages.French" :to-language="Languages.English"
                    text="Cliquez pour commencer" />
            </div>
            <div>
                <TranslatableText :from-language="Languages.French" :to-language="Languages.English"
                    text="Temps blanc" />: {{ ((completedTurnsTimes[Players.White]) / 1000).toFixed(2) }}s
            </div>
            <div>
                <TranslatableText :from-language="Languages.French" :to-language="Languages.English"
                    text="Temps noir" />: {{ ((completedTurnsTimes[Players.Black]) / 1000).toFixed(2) }}s
            </div>
        </div>
    </div>
</template>

<style>
.clickable {
    cursor: pointer;
}

.boardScreen {
    margin-left: auto;
    margin-right: auto;
    display: block;
    width: 700px;
}

.boardSVG {
    margin-left: 50px;
    margin-right: 50px;
}

.loadingMessage {
    vertical-align: top;
}

.game-text {
    display: inline-block;
}
</style>
