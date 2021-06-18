import React, { Fragment, useEffect , useState} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import { getProfileById } from '../../actions/profile';
import {Upload_img} from '../../actions/image' 

const Profile = ({ getProfileById, profile: { profile }, auth, match, Upload_img }) => {

  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
  const [img_upload,Setimg_upload]=useState('');

  return (
    <Fragment>
      {profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
    {auth&& auth.user &&   
   <Fragment> {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (
              <Fragment>  <form className="form my-1" onSubmit={e => {
                e.preventDefault();
                Upload_img(auth.user._id, img_upload)
              }}>
                <input className="choose-file" type="file" name="image " onChange={e => Setimg_upload(e)} />
                <button className="upload btn btn-primary" type="submit" >Upload</button>
              </form>
              </Fragment>
            )}
            </Fragment>}
         

          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile && profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((experience) => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((education) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>

    
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => (
  {
  profile: state.profile,
  auth: state.auth
});
export default connect(mapStateToProps, { getProfileById, Upload_img })(Profile);
