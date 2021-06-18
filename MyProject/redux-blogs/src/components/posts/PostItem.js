import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions,
  
}) => (
  <div className="post bg-white p-1 my-1">
    {console.log(_id)}
    <div>
      {user && user.image?console.log('yes'):console.log('No')}
      {user && user._id?  <Link to={`/profile/${user._id}`}>          
      {user.image? <img className="round-img my-1" src={`http://localhost:4000/api/upload/show/${user.image}`} alt="" /> :
              <img className="round-img my-1" src={avatar} alt="" />
         }
            <h4>{name}</h4>
          </Link>:''}
    
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">Posted on {formatDate(date)}</p>

      {showActions && (
        <Fragment>
          <button
            onClick={() => addLike(_id)}
            type="button"
            className="btn btn-light"
          >
            <i className="fas fa-thumbs-up" />{' '}
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>
          <button
            onClick={() => removeLike(_id)}
            type="button"
            className="btn btn-light"
          >
            <i className="fas fa-thumbs-down" />
          </button>
          <Link to={`/posts/${_id}`} className="btn btn-primary">
            Discussion{' '}
            {comments.length > 0 && (
              <span className="comment-count">{comments.length}</span>
            )}
          </Link>
          {!auth.loading && user && user._id === auth.user._id &&  (
            <button
              onClick={() => deletePost(_id)}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times" />
            </button>
          )}
        </Fragment>
       )}
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = (state) => 
{
 return { 
   auth: state.auth,
} ;
};

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
