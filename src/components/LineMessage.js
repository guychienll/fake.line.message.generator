import React, { Fragment } from "react";
import styled from "styled-components";
import { DAYS, MESSAGE_TYPE } from "../constants";
import moment from "moment";

export const LineMessage = (props) => {
  const { receiver, messages, setCurEditingMessage } = props;
  return (
    <StyledLineMessage>
      {messages
        .sort((a, b) => {
          if (moment(a.time).isSame(moment(b.time))) {
            return 0;
          }
          if (moment(a.time).isBefore(moment(b.time))) {
            return -1;
          }
          if (moment(a.time).isAfter(moment(b.time))) {
            return 1;
          }
        })
        .map((msg, index) => {
          const { type, time, read, message } = msg;
          return (
            <Fragment key={index}>
              {type === MESSAGE_TYPE.badge && (
                <div
                  onClick={() => {
                    setCurEditingMessage(msg);
                  }}
                  className="badge"
                >
                  {message ||
                    moment(time).format(
                      `M/DD ( ${DAYS[moment(time).day()].zh} )`
                    )}
                </div>
              )}
              {type === MESSAGE_TYPE.sender && (
                <div
                  className="sender"
                  onClick={() => {
                    setCurEditingMessage(msg);
                  }}
                >
                  <div className="status">
                    <small className="read">{read ? "已讀" : ""}</small>
                    <small className="time">
                      {moment(time).format("HH:mm")}
                    </small>
                  </div>
                  <div className="message">{message}</div>
                </div>
              )}
              {type === MESSAGE_TYPE.receiver && (
                <div
                  className="receiver"
                  onClick={() => {
                    setCurEditingMessage(msg);
                  }}
                >
                  <img
                    className="avatar"
                    alt="receiver-avatar"
                    src={receiver?.avatar || "https://fakeimg.pl/30x30/"}
                  />
                  <div className="message">{message}</div>
                  <div className="status">
                    <small className="time">
                      {moment(time).format("HH:mm")}
                    </small>
                  </div>
                </div>
              )}
            </Fragment>
          );
        })}
    </StyledLineMessage>
  );
};

const StyledLineMessage = styled.div`
  width: 100%;
  height: calc(100% - var(--line-header-height) - var(--line-footer-height));
  background-color: #fff;
  padding: 8px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-image: url("/line-message.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  & > .badge {
    cursor: pointer;
    align-self: center;
    display: inline-block;
    padding: 4px 10px;
    border-radius: 30px;
    background-color: #6f86a3;
    color: #fff;
    margin-bottom: 10px;
    font-size: 12px;
  }
  & > .receiver {
    cursor: pointer;
    display: flex;
    align-self: flex-start;
    margin-bottom: 8px;
    & > img {
      object-fit: cover;
    }
    & > .status {
      color: #46556b;
      font-size: 12px;
      letter-spacing: 0.5px;
      align-self: flex-end;
      & > small.time {
        margin-left: 5px;
      }
    }
    & > .avatar {
      width: 30px;
      height: 30px;
      border-radius: 15px;
      margin-right: 10px;
    }
    & > .message {
      font-size: 14px;
      color: #000;
      padding: 10px 12px;
      border-radius: 13px;
      position: relative;
      background-color: #fff;
      display: inline-block;
      max-width: 160px;
      word-break: break-word;
      align-self: flex-start;
      &:after {
        content: "";
        background-image: url("/line-msg-received-after.png");
        background-size: cover;
        position: absolute;
        top: 0;
        left: -5px;
        z-index: 1;
        width: 13px;
        height: 10px;
      }
    }
  }
  & > .sender {
    cursor: pointer;
    display: flex;
    align-self: flex-end;
    margin-bottom: 8px;
    & > .status {
      display: flex;
      flex-direction: column;
      align-self: flex-end;
      align-items: flex-end;
      margin-right: 5px;
      color: #46556b;
      font-size: 12px;
      letter-spacing: 0.5px;
    }
    & > .message {
      font-size: 14px;
      color: #000;
      padding: 10px 12px;
      border-radius: 13px;
      position: relative;
      background-color: #b2ed8b;
      display: inline-block;
      max-width: 160px;
      word-break: break-word;
      &:after {
        content: "";
        background-image: url("/line-msg-send-after.png");
        background-size: cover;
        position: absolute;
        top: 0;
        right: -5px;
        z-index: 1;
        width: 13px;
        height: 10px;
      }
    }
  }
`;
