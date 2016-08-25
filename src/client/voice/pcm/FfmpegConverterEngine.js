const ConverterEngine = require('./ConverterEngine');
const ChildProcess = require('child_process');

function chooseCommand() {
  for (const cmd of ['ffmpeg', 'avconv', './ffmpeg', './avconv']) {
    if (!ChildProcess.spawnSync(cmd, ['-h']).error) {
      return cmd;
    }
  }
}

class FfmpegConverterEngine extends ConverterEngine {
  constructor(player) {
    super(player);
    this.command = chooseCommand();
  }

  handleError(encoder, err) {
    if (encoder.destroy) {
      encoder.destroy();
    }
    this.emit('error', err);
  }

  createConvertStream() {
    super.createConvertStream();
    const encoder = ChildProcess.spawn(this.command, [
      '-analyzeduration', '0',
      '-loglevel', '0',
      '-i', '-',
      '-f', 's16le',
      '-ar', '48000',
      '-ss', '0',
      'pipe:1',
    ], { stdio: ['pipe', 'pipe', 'ignore'] });
    encoder.on('error', e => this.handleError(encoder, e));
    encoder.stdin.on('error', e => this.handleError(encoder, e));
    encoder.stdout.on('error', e => this.handleError(encoder, e));
    return encoder;
  }
}

module.exports = FfmpegConverterEngine;
