/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');
const data = require('./collections.json');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = 'amzn1.ask.skill.08f3c41d-0fdd-42a0-8cd1-627b51657410';

const SKILL_NAME = 'Captain Fort';
const GET_DROP_MESSAGE = "You are dropping in: ";
const GET_STRAT_MESSAGE = "Captain Fort's challenge: ";
const HELP_MESSAGE = 'You can ask for a drop zone, solo, duo, or squad challenge. And if you want to exit say quit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
const drop_zones = data.drop_zones;
const solo_strats = data.solo;
const duo_strats = data.duo;
const squad_strats = data.squad;

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetDrop');
    },
    'GetDrop': function () {
        const dropArr = drop_zones;
        const dropIndex = Math.floor(Math.random() * dropArr.length);
        const randomDrop = dropArr[dropIndex];
        const speechOutput = GET_DROP_MESSAGE + randomDrop;

        this.response.cardRenderer(SKILL_NAME, randomDrop);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'GetChallenge': function () {
        const mode = this.event.request.intent.slots.mode.value
        
        var modeArr = solo_strats;
        
        switch (mode) {
            case 'solo':
                modeArr = solo_strats
                break;
            case 'duo':
                modeArr = duo_strats
                break;
            case 'squad':
                modeArr = squad_strats
                break;
            default:
                modeArr = solo_strats
        }
        
        const modeIndex = Math.floor(Math.random() * modeArr.length);
        const randomChallenge = modeArr[modeIndex];
        const speechOutput = GET_STRAT_MESSAGE + randomChallenge;
        
        this.response.cardRenderer(SKILL_NAME, randomChallenge);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
