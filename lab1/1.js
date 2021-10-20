const fs = require('fs');

const CIPHERED_TEXT = 'yX@CENVERGRVC^YP\RNoxeT^G_RErP^CD_XB[SCV\RVDCE^YPշ�_R[[X@XE[Sշ�VYSP^ARYC_R\RN^Dշ�\RNշ�OXEC_RQ^EDC[RCCREշ�_շ�@^C_շ�\շ�C_RYOXEշ�Rշ�@^C_շ�Rշ�C_RYշ�[շ�@^C_շ�Nշ�VYSC_RYOXEYROCT_VEշ�[շ�@^C_շ�\շ�VPV^YC_RYշ�Xշ�@^C_շ�Rշ�VYSDXXYnXBZVNBDRVY^YSROXQTX^YT^SRYTRVZZ^YPS^DCVYTR|VD^D\^ROVZ^YVC^XYDCVC^DC^TV[CRDCDXE@_VCRAREZRC_XSNXBQRR[@XB[SD_X@C_RURDCERDB[C';

const writeAllPossibleDecipheredTexts = (text) => {
  const writeStream = fs.createWriteStream('./out.txt');

  KEYS.forEach((key) => {
    const decipheredText = [...text].reduce((accum, [char]) => accum + String.fromCharCode(char.charCodeAt() ^ key), '');
  
    writeStream.write(`${decipheredText}\n\n`, 'utf-8');
  });

  writeStream.end();
}

writeAllPossibleDecipheredTexts(CIPHERED_TEXT);
