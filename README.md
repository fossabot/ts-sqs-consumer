# ts-sqs-consumer

![npm](https://img.shields.io/npm/dm/ts-sqs-consumer?style=for-the-badge)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/sshivananda/ts-sqs-consumer/Node.js%20CI?style=for-the-badge)
![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability-percentage/sshivananda/ts-sqs-consumer?style=for-the-badge)
![Code Climate coverage](https://img.shields.io/codeclimate/coverage/sshivananda/ts-sqs-consumer?style=for-the-badge)
![Code Climate issues](https://img.shields.io/codeclimate/issues/sshivananda/ts-sqs-consumer?style=for-the-badge)

![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/sshivananda/ts-sqs-consumer?style=for-the-badge)
![GitHub](https://img.shields.io/github/license/sshivananda/ts-sqs-consumer?style=for-the-badge)

Typescript based sqs consumer. Handles message transport and deletion from SQS: just add a handler function for the messages from SQS to get started.

## Usage

```ts
const tsSQSConsumer: SQSConsumer<TestMessageType> = new SQSConsumer({
    sqsOptions: {
      clientOptions: {
        region: 'us-east-1',
      },
      receiveMessageOptions: {
        queueUrl: 'url-of-your-queue',
        visibilityTimeout: 1800,
        waitTimeSeconds: 20,
        maxNumberOfMessages: 1,
        stopAtFirstError: false,
      },
    },
    jobProcessor: (async (message: TestMessageType) => {
      console.log('Got message');
      console.log(message);
    }),
  });
  await tsSQSConsumer
    .processPendingJobs()
    .catch((err: Error): void => {
      throw err;
    });
```