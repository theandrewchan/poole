import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Helmet from 'react-helmet'
import { config } from 'config'

import "../css/main.scss";
import styles from "../css/index.module.scss";

import soundfoundry from "../assets/soundfoundry1.jpg";
import tweetrunner from "../assets/tweet-runner.png";

export default class Index extends React.Component {
  render() {
    return (
      <div>
        <div className={styles.hero}>
            <div className={styles.herologo}>
                <h1>
                  Andrew Chan
                </h1>
            </div>
            <div className={styles.herolinks}>
                <Link to={prefixLink("/about/")}>about</Link>
                <span>&times;</span>
                <Link to={prefixLink("/writing/")}>writing</Link>
            </div>
        </div>
        <Link to={prefixLink("/soundfoundry")}>
            <div className={styles.item}>
                <div>
                    <h2>SoundFoundry</h2>
                    <h3>
                        A fully featured music player inspired by SoundCloud. Built with React + Redux.
                    </h3>
                </div>
                <img src={soundfoundry} />
            </div>
        </Link>
        <Link to={prefixLink("/tweetrunner")}>
            <div className={styles.item}>
                <div>
                    <h2>Tweet Runner</h2>
                    <h3>
                        Web game that responds to Twitter. Built in 24 hours + 3rd place winner of Berkeley CSUA Hackathon.
                    </h3>
                </div>
                <img src={tweetrunner} />
            </div>
        </Link>
      </div>
    );
  }
}
