import React from 'react'
import styled from 'styled-components'

export const LineFooter = (props) => {
    const { unSendMessage = '' } = props
    return (
        <StyledLineFooter>
            {unSendMessage ? (
                <div className="unsent-send-message">{unSendMessage}</div>
            ) : (
                <div className="empty">Aa</div>
            )}
        </StyledLineFooter>
    )
}

const StyledLineFooter = styled.div`
    width: 100%;
    height: var(--line-footer-height);
    background-image: url('/line-footer.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    position: relative;
    & > .unsent-send-message {
        position: absolute;
        left: 120px;
        font-size: 14px;
        max-width: 130px;
        overflow-x: hidden;
        white-space: nowrap;
    }
    & > .empty {
        position: absolute;
        left: 120px;
        font-size: 14px;
        max-width: 130px;
        overflow-x: hidden;
        white-space: nowrap;
        color: #cccbcc;
    }
`
