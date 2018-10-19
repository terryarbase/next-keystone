vogue_cms
=========

## Prerequisite
1. Node.js 8.x or above
2. MongoDB 3.4.9 or above
3. npm 6.x or above

## To run Project for development
1. Make sure mongoDB instance are running. You can run one by `$ mongod`
2. `$ cd {project dir}`
2. `$ npm install`
3. `$ node keystone.js`

Make change in `/config/Config.js` for any different connection settings.


<!-- orderCompleteNotification
message
訂單完成通知

orderCompleteNotification
message_en-US
Order Complete Notification


orderRecallNotification
message
訂單召回通知

orderRecallNotification
message_en-US
Order recall notification -->



TL;DR
-----

1. [Publish to a Topic - Amazon Simple Notification Service][30.1]
2. [Send Custom Platform-Specific Payloads in Messages to Mobile Devices - Amazon Simple Notification Service][30.2]
3. [KeystoneJS · Setting up and using Data Models][30.3]
4. [Class: AWS.SNS — AWS SDK for JavaScript][30.4]
5. [Actions - Amazon Simple Notification Service][30.5]
6. [AWS Service Limits - Amazon Web Services][30.6]

[30.1]: https://docs.aws.amazon.com/sns/latest/dg/PublishTopic.html
[30.2]: https://docs.aws.amazon.com/sns/latest/dg/mobile-push-send-custommessage.html
[30.3]: http://keystonejs.com/docs/database/#fieldtypes
[30.4]: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SNS.html
[30.5]: https://docs.aws.amazon.com/sns/latest/api/API_Operations.html
[30.6]: https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html#limits_sns
