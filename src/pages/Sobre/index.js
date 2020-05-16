import React from 'react';

import Header from '../../components/Header';

import './styles.css';

import gasosa from '../../assets/img/gasosa.jpg';

export default function Sobre () {
    return (
        <div className="box">
            <Header />
            <div className="top">
                <img src={gasosa} alt="" />
                <span>Gasosa!</span>
            </div>

            <div className="sobre">
                <p>Praesent tempus fringilla risus in rhoncus. Mauris congue risus a nisl feugiat sodales. Mauris rutrum erat quis purus semper, a pretium quam pellentesque. Nunc egestas orci eros, a gravida ligula condimentum in. Duis sollicitudin egestas lacinia. Vestibulum malesuada elit ut quam mollis, non semper massa rhoncus. In hendrerit efficitur imperdiet. Morbi et enim massa. Suspendisse sem metus, facilisis in finibus sed, pretium vel dolor. Praesent nec neque enim.</p>

                <p>Integer pretium efficitur enim non elementum. Nulla congue nisi at orci hendrerit, in placerat dui facilisis. Suspendisse id euismod mi. Ut at arcu at ligula sollicitudin hendrerit. Duis ut porttitor nisl, sit amet bibendum purus. Donec vulputate odio ligula, eget faucibus risus lacinia quis. Donec a libero eget sapien iaculis dictum. Mauris tincidunt blandit augue, et gravida justo laoreet at.</p>
            </div>
        </div>
    )
};