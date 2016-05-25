/**
 * Created by steven on 16/5/10.
 */
'use strict';
import Wilddog from "wilddog";
import VueMemoryGame from "./VueMemoryGame";

const wilddog = new Wilddog("https://public.wilddogio.com/");
const gameApi = new VueMemoryGame(wilddog);

export default {
    gameApi
}


