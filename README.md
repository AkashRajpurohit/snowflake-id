<h1 align="center" style="border-bottom: none;">❄️ @akashrajpurohit/snowflake-id</h1>
<h3 align="center">A simple and lightweight Node.js library to generate unique snowflake IDs.</h3>
<br />
<p align="center">
  <a href="https://github.com/AkashRajpurohit/snowflake-id/actions/workflows/test-and-release.yml">
    <img alt="Build states" src="https://github.com/AkashRajpurohit/snowflake-id/actions/workflows/test-and-release.yml/badge.svg?branch=main">
  </a>
  <a href="https://www.npmjs.com/package/@akashrajpurohit/snowflake-id">
    <img alt="npm latest version" src="https://img.shields.io/npm/v/@akashrajpurohit/snowflake-id/latest.svg">
  </a>
  <a href="https://www.npmjs.com/package/@akashrajpurohit/snowflake-id">
    <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/@akashrajpurohit/snowflake-id">
  </a>
  <img alt="Visitors count" src="https://visitor-badge.laobi.icu/badge?page_id=@akashrajpurohit~snowflake-id.visitor-badge&style=flat-square&color=0088cc">
  <a href="https://github.com/AkashRajpurohit/snowflake-id/actions">
    <img alt="Coverage" src="https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/AkashRajpurohit/7336f237b82d9581c5f52405f87db531/raw/snowflake-id-coverage.json">
  </a>
  <a href="https://www.npmjs.com/package/@akashrajpurohit/snowflake-id">
    <img alt="NPM license" src="https://img.shields.io/npm/l/@akashrajpurohit/snowflake-id">
  </a>
  <a href="https://twitter.com/akashwhocodes">
    <img alt="follow on twitter" src="https://img.shields.io/twitter/follow/akashwhocodes.svg?style=social&label=@akashwhocodes">
  </a>

  <p align="center">
    <a href="https://github.com/AkashRajpurohit/snowflake-id/issues/new?template=bug_report.md">Bug report</a>
    ·
    <a href="https://github.com/AkashRajpurohit/snowflake-id/issues/new?template=feature_request.md">Feature request</a>
  </p>
</p>
<br />
<hr />

`@akashrajpurohit/snowflake-id` is a Node.js library for generating unique and distributed IDs that are suitable for use as primary keys in distributed systems.

It generates 64-bit IDs (in string format) that are composed of a timestamp, a worker ID, and a sequence number. These IDs are based on [Twitter's Snowflake ID](https://github.com/twitter-archive/snowflake/tree/snowflake-2010) generation algorithm.

> Read in detail about [what are Snowflake IDs](https://akashrajpurohit.com/blog/snowflake-id-generating-unique-ids-for-distributed-systems/?ref=github-desc)

## Installation 🚀

You can install `@akashrajpurohit/snowflake-id` using pnpm/npm/yarn:

```bash
pnpm add @akashrajpurohit/snowflake-id

# OR

npm install @akashrajpurohit/snowflake-id

# OR

yarn add @akashrajpurohit/snowflake-id
```

## Usage 💻

Here's an example of how to use `@akashrajpurohit/snowflake-id`:

```javascript
const { SnowflakeId } = require('@akashrajpurohit/snowflake-id');

const snowflake = SnowflakeId({
  workerId: 1,
  nodeIdBits: 10,
  sequenceBits: 12,
  epoch: 1683982358000,
});

console.log(snowflake.generate()); // 14755887168818983731200
```

This will generate a unique ID in string format.

## Configuration options ⚙️

The SnowflakeId constructor takes an options object with the following properties:

- `workerId` (optional): A number between 0 and (2^`nodeIdBits`)-1 that represents the ID of the worker generating the IDs.

  Defaults to 0 if not specified.

- `nodeIdBits` (optional): The number of bits used to represent the worker ID.

  Defaults to 10 if not specified.

- `sequenceBits` (optional): The number of bits used to represent the sequence number.

  Defaults to 12 if not specified.

- `epoch` (optional): A timestamp in milliseconds representing the start of the ID generation.

  Defaults to January 1, 1970 at 00:00:00 UTC if not specified.

## Methods 🧮

The SnowflakeId instance has the following methods:

- `generate()`: Generates a unique ID in string format.

## Error Handling 😱

The SnowflakeId instance throws an error if the clock moves backwards, i.e., if the current timestamp is less than the last timestamp.

This can happen if the system clock is adjusted manually or if the system clock drifts significantly.

If this happens, the library throws an Error with the message `Clock is moving backwards!`.

## Examples 🔠

Here's an example of how to generate 10 IDs:

```javascript
import { SnowflakeId } from '@akashrajpurohit/snowflake-id';

const snowflake = SnowflakeId();

for (let i = 0; i < 10; i++) {
  console.log(snowflake.generate());
}
```

And here's an example of how to generate IDs using different worker IDs:

```javascript
import { SnowflakeId } from '@akashrajpurohit/snowflake-id';

const worker1 = SnowflakeId({ workerId: 1 });
const worker2 = SnowflakeId({ workerId: 2 });

console.log(worker1.generate()); // Generates an ID with worker ID 1
console.log(worker2.generate()); // Generates an ID with worker ID 2
```

While using it in distributed systems, it is highly recommended that you set a unique `workerId` to reduce collisions of IDS.

While the implementation detail depends on you, one simple way to set a possible unique `workerId` is to use `process.pid`.

```javascript
import { SnowflakeId } from '@akashrajpurohit/snowflake-id';

const workerId = process.pid % 1024; // Using PID as workerId
const snowflake = SnowflakeId({ workerId });

const id = snowflake.generate(); // Generate a new Snowflake ID
console.log(id);
```

## Notes 📝

- It is recommended to use a higher `nodeIdBits` or `sequenceBits` value if you expect to generate IDs on multiple machines, as this reduces the chance of ID collisions.

- The `workerId` parameter can be omitted, in which case the `workerId` would be set to 0. However, if you expect to generate IDs on multiple machines, it is recommended to set a specific workerId value to reduce the chance of ID collisions.

- The epoch timestamp should be set as close to the current time as possible to maximize the lifespan of the generator. If the epoch is set too far in the past or future, the generator may not be able to generate IDs for the full lifespan of the generator.
  <details>
    <summary>Learn more</summary>
    <p>The epoch timestamp is used as the starting point for generating unique IDs. If the epoch timestamp is set too far in the past or future, it can limit the lifespan of the generator. This is because the timestamp portion of a generated ID is typically a smaller number of bits compared to the total number of bits in the ID, and as a result, the maximum value for the timestamp portion can be reached more quickly than the other portions.</p>
    <p>For example, if the epoch timestamp is set to January 1, 1970, which is the Unix epoch, and the generator is configured to use 41 bits for the timestamp portion, the maximum value for the timestamp portion would be reached in the year 2088. This means that after 2088, the generator would no longer be able to generate unique IDs.</p>
    <p>Therefore, it's important to set the epoch timestamp as close to the current time as possible to maximize the lifespan of the generator. This will ensure that the timestamp portion of the generated IDs will not reach their maximum value too quickly, allowing the generator to continue generating unique IDs for a longer period of time.</p>
  </details>

## Bugs or Requests 🐛

If you encounter any problems feel free to open an [issue](https://github.com/AkashRajpurohit/snowflake-id/issues/new?template=bug_report.md). If you feel the project is missing a feature, please raise a [ticket](https://github.com/AkashRajpurohit/snowflake-id/issues/new?template=feature_request.md) on GitHub and I'll look into it. Pull requests are also welcome.

## Where to find me? 👀

[![Website Badge](https://img.shields.io/badge/-akashrajpurohit.com-3b5998?logo=google-chrome&logoColor=white)](https://akashrajpurohit.com/)
[![Twitter Badge](https://img.shields.io/badge/-@akashwhocodes-00acee?logo=Twitter&logoColor=white)](https://twitter.com/AkashWhoCodes)
[![Linkedin Badge](https://img.shields.io/badge/-@AkashRajpurohit-0e76a8?logo=Linkedin&logoColor=white)](https://linkedin.com/in/AkashRajpurohit)
[![Instagram Badge](https://img.shields.io/badge/-@akashwho.codes-e4405f?logo=Instagram&logoColor=white)](https://instagram.com/akashwho.codes/)
[![Telegram Badge](https://img.shields.io/badge/-@AkashRajpurohit-0088cc?logo=Telegram&logoColor=white)](https://t.me/AkashRajpurohit)
