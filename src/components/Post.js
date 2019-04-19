import React, { Component, Fragment } from "react";
import { TiStarOutline, TiUserOutline, TiMessages } from "react-icons/ti";
import NewComment from './NewComment';

class PostPreview extends Component {
  render() {
    return (
      <div className="main-post">
        <div className="points-post">
          {" "}
          <TiStarOutline /> 99 points
        </div>
        <a href="/">
          <h2>
            Linear or Declining Sales Growth Got You in a Funk? Go Talk to Your
            Developers...
          </h2>
          <p>
            Are your sales dropping despite your sales and marketing teams doing
            all they can? See why your developer organization might have the
            answers you’re looking for.
          </p>
        </a>
        <div>
          <span className="author-post">
            <TiUserOutline /> Author: <a href="/">Jim Ettig</a>
          </span>
          <span className="comments-post">
            <TiMessages /> Comments:
          </span>
        </div>
      </div>
    );
  }
}

class Post extends Component {
  render() {
    return (
      <Fragment>
        <div className="main-post-individual">
          <span className="author-post-individual">
            Author: <a href="/">Jim Ettig</a>
          </span>

          <h3>I'm serious as a heart attack</h3>
          <p>
            You think water moves fast? You should see ice. It moves like it has
            a mind. Like it knows it killed the world once and got a taste for
            murder. After the avalanche, it took us a week to climb out. Now, I
            don't know exactly when we turned on each other, but I know that
            seven of us survived the slide... and only five made it out. Now we
            took an oath, that I'm breaking now. We said we'd say it was the
            snow that killed the other two, but it wasn't. Nature is lethal but
            it doesn't hold a candle to man.
          </p>

          <h3>No man, I don't eat pork</h3>
          <p>
            Well, the way they make shows is, they make one show. That show's
            called a pilot. Then they show that show to the people who make
            shows, and on the strength of that one show they decide if they're
            going to make more shows. Some pilots get picked and become
            television programs. Some don't, become nothing. She starred in one
            of the ones that became nothing.
          </p>

          <div>
            <span className="points-post">
              <TiStarOutline /> 99 points
            </span>
          </div>
        </div>              
        <div className="comments-post-individual">
          <div className='comments-post-title'>
            <TiMessages /> This post has 3 Comments
          </div>
          
          <div className="comment-author">
            <div className='author-name'>Author Xoxo 001</div>
            <p>
              My money's in that office, right? If she start giving me some
              bullshit about it ain't there, and we got to go someplace else and
              get it, I'm gonna shoot you in the head then and there.
            </p>
          </div>

          <div className="comment-author">
            <div className='author-name'>Author Xoxo 002</div>
            <p>
              My money's in that office, right? If she start giving me some
              bullshit about it ain't there.
            </p>
          </div>

          <div className="comment-author">
            <div className='author-name'>Author Xoxo 003</div>
            <p>
              My money's in that office, right?
            </p>
          </div>
        </div>
           <NewComment /> 
        </Fragment>
    );
  }
}

export { PostPreview, Post };
