import styled from 'styled-components';
import React from 'react';
import { FiChevronLeft, FiMenu, FiPhone, FiSearch } from 'react-icons/fi';

export const LineHeader = (props) => {
    const { receiver = {}, unReadCount = 0 } = props;
    const { name } = receiver;
    return (
        <StyledLineHeader>
            <div className="left">
                <FiChevronLeft size={20} color="#202733" />
                {unReadCount > 0 && (
                    <div className="unread-message-count">
                        {unReadCount > 99 ? '99+' : `${unReadCount}`}
                    </div>
                )}
                <div className="receiver-name">{name}</div>
            </div>
            <div className="right">
                <FiSearch size={17} />
                <FiPhone size={17} />
                <FiMenu size={17} />
            </div>
        </StyledLineHeader>
    );
};

const StyledLineHeader = styled.div`
    width: 100%;
    height: var(--line-header-height);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5px;
    background-color: #8cabd9;
    font-weight: bold;
    & > .left {
        display: flex;
        align-items: center;
        color: #202733;
        & > .unread-message-count {
            font-size: 14px;
            margin-right: 10px;
        }
    }
    & > .right {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 75px;
    }
`;
