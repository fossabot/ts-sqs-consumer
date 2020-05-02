import * as AWSMock from 'aws-sdk-mock';
import * as AWS from 'aws-sdk';
import * as sinon from 'sinon';

import MessageProcessor from '../../src/message-processor/MessageProcessor';
import { SQSOptions } from '../../src/sqs/SQSOptions';
import Logger from '../../src/logger/Logger';
import LogLevels from '../../src/logger/LogLevels';

// Tests for the MessageProcessor class
describe('MessageProcessor', (): void => {
  const loggerObj: Logger = new Logger({
    logLevel: LogLevels.info,
  });
  type SampleMessageType = {
    data: string;
    handle: string;
  };

  const messageHandle: string = 'handle';
  const data: string = 'random-data';
  const sampleMessage: SampleMessageType = {
    data: data,
    handle: messageHandle,
  };
  const sqsConsumerOpts: SQSOptions = {
    clientOptions: {
      region: 'region-that-does-not-exist',
    },
    receiveMessageOptions: {
      queueUrl: 'url-that-does-not-exist',
      visibilityTimeout: -1,
      waitTimeSeconds: -1,
      maxNumberOfMessages: -1,
      stopAtFirstError: false,
    },
  };

  describe('getMessage', (): void => {
    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('should retreive a message when one is available', async (): Promise<void> => {
      AWSMock.setSDKInstance(AWS);
      const receiveWithMessage: sinon.SinonSpy = sinon.spy((params: any, callback: any): void => {
        callback(undefined, {
          Messages: [{
            Body: JSON.stringify(data),
            ReceiptHandle: messageHandle,
          }],
        });
      });
      AWSMock.mock('SQS', 'receiveMessage', receiveWithMessage);
      const messageProcessor: MessageProcessor<SampleMessageType> = new MessageProcessor({
        logger: loggerObj,
        sqsOptions: sqsConsumerOpts,
      });
      const messages: SampleMessageType[] | undefined = await messageProcessor.getMessages();
      expect(messages)
        .toStrictEqual([{
          sampleMessage,
        }]);
    });
  });
});
