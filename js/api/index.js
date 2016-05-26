/**
 * Created by steven on 16/5/10.
 */
'use strict';
import Wilddog from "wilddog";
import VueMemoryGame from "./VueMemoryGame";

const wilddog = new Wilddog("https://public.wilddogio.com/");

export const gameApi = new VueMemoryGame(wilddog);
