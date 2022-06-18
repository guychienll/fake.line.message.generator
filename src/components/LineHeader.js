import styled from 'styled-components';
import React from 'react';

export const LineHeader = (props) => {
    const { receiver = {}, unReadCount = 0 } = props;
    const { name } = receiver;
    return (
        <StyledLineHeader>
            {unReadCount > 0 && (
                <div className="unread-message-count">
                    {unReadCount > 99 ? '99+' : `${unReadCount}`}
                </div>
            )}
            <div className="receiver-name">{name}</div>
        </StyledLineHeader>
    );
};

const StyledLineHeader = styled.div`
    width: 100%;
    height: var(--line-header-height);
    background-image: url('/line-header.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    padding: 0 32px;
    color: #202733;
    font-size: 14px;
    font-weight: bold;
    & > .unread-message-count {
        margin-right: 10px;
    }
`;
