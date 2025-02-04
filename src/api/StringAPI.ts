// Copyright (c) 2021 Amirhossein Movahedi (@qolzam)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { RegexPattern } from 'constants/RegexPattern';
import { ServerRequestType } from 'constants/serverRequestType';
const isValidEmail = (email: string) => {
    const re = RegexPattern.ValidEmail;
    return re.test(email);
};

const createServerRequestId = (requestType: ServerRequestType, uniqueId: string) => {
    return `${requestType}:${uniqueId}`;
};

function queryString(name: string, url: string = window.location.href) {
    name = name.replace(/[[]]/g, '\\$&');

    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i');
    const results = regex.exec(url);

    if (!results) {
        return null;
    }
    if (!results[2]) {
        return '';
    }

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/**
 * Validate URL
 */
const validateUrl = (url: string) => {
    return RegexPattern.ValidateURL.test(url);
};

/**
 * Get youtube code from youtube URL
 */
const getYoutubeCodeUrl = (url: string) => {
    const match = url.match(RegexPattern.YoutubUrlCode);
    return match && match[7].length === 11 ? match[7] : false;
};

/**
 * Get youtube image thumbnails
 */
const getYoutubetThumbnails = (url: string) => {
    return `//img.youtube.com/vi/${getYoutubeCodeUrl(url)}/0.jpg`;
};

/**
 * Validate youtube URL
 */
const validateYoutubeUrl = (url: string) => {
    const match = url.match(RegexPattern.ValidYoutubeURL);
    return match && match[2].length === 11;
};

/**
 * Whether string is empty
 */
const isEmpty = (input?: string) => {
    return !input || /^\s*$/.test(input) || input.length === 0 || !input.trim();
};

const getNumberOfLines = (input: string) => {
    return input.split('\n').length;
};

function capitalizeFirstLetter(input: string) {
    return input.charAt(0).toUpperCase() + input.slice(1);
}

export default {
    isValidEmail,
    queryString,
    createServerRequestId,
    getYoutubeCodeUrl,
    getYoutubetThumbnails,
    validateYoutubeUrl,
    validateUrl,
    getNumberOfLines,
    isEmpty,
    capitalizeFirstLetter,
};
