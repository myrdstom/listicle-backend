import passport from 'passport';
import ValidateProfileInput from '../validation/profile/profile';
import Profile from '../models/Profile';

class ProfileController{
    static async getProfile(req,res){
        const errors = {};
        Profile.findOne({ user: req.user.id }).then(profile => {
            if (!profile) {
                errors.error = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })

    }

    static async createProfile(req,res){
        const { errors, isValid } = ValidateProfileInput(req.body);
        //Check Validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
        // Get fields
        const profileFields = {};
        profileFields.user = req.user.id;
        if (req.body.bio) profileFields.bio = req.body.bio;
        if (req.body.firstName) profileFields.firstName = req.body.firstName;
        if (req.body.lastName) profileFields.lastName = req.body.lastName;
        if (req.body.avatar) profileFields.avatar = req.body.avatar;
        Profile.findOne({ user: req.user.id }).then(profile => {
            if (profile) {
                //Update
                Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true, useFindAndModify: false }
                ).then(profile => res.json(profile));
            } else {
                // Create

                // Check if username exists
                Profile.findOne({ user: profileFields.user }).then(
                    profile => {
                        // Save profile
                        new Profile(profileFields)
                            .save()
                            .then(profile => res.status(201).json(profile));
                    }
                );
            }
        });
    }

}

export default ProfileController
