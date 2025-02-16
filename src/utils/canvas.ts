import * as html2Img from 'html-to-image';
import moment from 'moment';
import { track } from './tracking';

async function download() {
    const canvasDom = document.getElementById('line');
    const messageContainer = canvasDom.querySelector(
        '#message-container'
    ) as HTMLElement;

    const originalHeight = messageContainer.style.height;
    messageContainer.style.height = `${messageContainer.scrollHeight}px`;

    const fontEmbedCss = await html2Img.getFontEmbedCSS(canvasDom);
    const imageOptions = {
        canvasHeight: canvasDom.clientHeight * 2.5,
        canvasWidth: canvasDom.clientWidth * 2.5,
        quality: 1,
        pixelRatio: 1,
        fontEmbedCSS: fontEmbedCss,
    };

    const dataUri = await html2Img.toPng(canvasDom, imageOptions);

    messageContainer.style.height = originalHeight;

    const downloadLink = document.createElement('a');
    const fileName = `flmg-${moment(new Date()).format('YYYYMMDDHHmmss')}.png`;
    const downloadUrl = dataUri.replace(
        /^data:image\/[^;]/,
        'data:application/octet-stream'
    );

    downloadLink.download = fileName;
    downloadLink.href = downloadUrl;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();

    track('event', 'export', {
        event_category: 'click',
        event_label: '圖片輸出',
    });
}

export { download };
