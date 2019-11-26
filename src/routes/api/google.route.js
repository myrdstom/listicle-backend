import {google} from 'googleapis';
import { Router } from 'express';
import * as OAuth2Data from '../../OAuth/google_key';


const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URL = OAuth2Data.web.redirect_uris[0];

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
);
var authed = false;

const router = Router();

router.get('/test', (req, res) => {
    console.log(CLIENT_ID,'the client id');
    res.status(200).json({message:"this works"});
});

router.get('/login', (req, res) => {
    if (!authed) {
        // Generate an OAuth URL and redirect there
        const url = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/gmail.readonly',
        });
        console.log(url);
        res.redirect(url);
    } else {
        const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
        gmail.users.labels.list(
            {
                userId: 'me',
            },
            (err, res) => {
                if (err)
                    return console.log('The API returned an error: ' + err);
                const labels = res.data.labels;
                if (labels.length) {
                    console.log('Labels:');
                    labels.forEach(label => {
                        console.log(`- ${label.name}`);
                    });
                } else {
                    console.log('No labels found.');
                }
            }
        );
        res.send('Logged in');
    }
});

router.get('/auth/google/callback', function(req, res) {
    const code = req.query.code;
    if (code) {
        // Get an access token based on our OAuth code
        oAuth2Client.getToken(code, function(err, tokens) {
            if (err) {
                console.log('Error authenticating');
                console.log(err);
            } else {
                console.log('Successfully authenticated');
                oAuth2Client.setCredentials(tokens);
                authed = true;
                res.redirect('/');
            }
        });
    }
});

export default router;