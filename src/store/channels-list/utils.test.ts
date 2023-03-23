import { channelMapper } from './utils';

describe('channelMapper', () => {
  it('isChannel from Anonymous view', async function () {
    const channel = {
      isChannel: undefined,
    };

    const result = channelMapper(channel as any);

    expect(result).toMatchObject({ isChannel: true });
  });

  it('isChannel true from Authenticated view', async function () {
    const channel = {
      isChannel: true,
    };

    const result = channelMapper(channel as any);

    expect(result).toMatchObject({ isChannel: true });
  });

  it('isChannel false from Authenticated view', async function () {
    const channel = {
      isChannel: false,
    };

    const result = channelMapper(channel as any);

    expect(result).toMatchObject({ isChannel: false });
  });
});