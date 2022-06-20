import React from 'react';
import styled from 'styled-components';
import { BiMicrophone } from 'react-icons/bi';
import { MdOutlineBrokenImage } from 'react-icons/md';
import { FiPlus, FiCamera, FiImage } from 'react-icons/fi';

export const LineFooter = (props) => {
    const { unSendMessage = '' } = props;
    return (
        <StyledLineFooter>
            <FiPlus size={20} />
            <FiCamera size={20} />
            <MdOutlineBrokenImage size={20} />
            <div className="input-area">
                {unSendMessage ? (
                    <div className="unsent-send-message">{unSendMessage}</div>
                ) : (
                    <div className="empty">Aa</div>
                )}
            </div>
            <BiMicrophone size={20} />
        </StyledLineFooter>
    );
};

const StyledLineFooter = styled.div`
    width: 100%;
    height: var(--line-footer-height);
    padding: 0 5px;
    justify-content: space-between;
    background-color: #fff;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    position: relative;
    & > .input-area {
        position: relative;
        width: 170px;
        height: 80%;
        background-color: #f5f5f5;
        border-radius: 20px;

        & > .unsent-send-message {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 14px;
            max-width: 130px;
            overflow-x: hidden;
            white-space: nowrap;
        }
        & > .empty {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 15px;
            font-size: 14px;
            max-width: 130px;
            overflow-x: hidden;
            white-space: nowrap;
            color: #cccbcc;
        }
    }
`;
