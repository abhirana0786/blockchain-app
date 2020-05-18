import React, { Component } from "react";
import makeBlockie from "ethereum-blockies-base64";

export default function Blockie({ hash, className }) {
    return (
      <img
        src={makeBlockie(hash)}
        alt='blockie'
        className={className}
      />
    );
}