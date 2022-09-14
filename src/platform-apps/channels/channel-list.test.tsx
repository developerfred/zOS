import React from 'react';

import { shallow } from 'enzyme';

import { ChannelList } from './channel-list';
import { ZnsLink } from '@zer0-os/zos-component-library';
import Collapsible from 'react-collapsible';

describe('ChannelList', () => {
  const subject = (props: any = {}) => {
    const allProps = {
      ...props,
    };

    return shallow(<ChannelList {...allProps} />);
  };

  it('renders each channel name', () => {
    const channels = [
      { id: 'one', name: 'first channel' },
      { id: 'two', name: 'second channel' },
      { id: 'three', name: 'third channel' },
      { id: 'four', name: 'fourth channel' },
    ];

    const wrapper = subject({ channels });

    const text = wrapper.find('.channel-list__channel-name').map((c) => c.text().trim());

    expect(text).toStrictEqual([
      'first channel',
      'second channel',
      'third channel',
      'fourth channel',
    ]);
  });

  it('adds an octothorpe to channel name', () => {
    const channels = [
      { id: 'one', name: 'first channel' },
      { id: 'two', name: 'second channel' },
      { id: 'three', name: 'third channel' },
      { id: 'four', name: 'fourth channel' },
    ];

    const wrapper = subject({ channels });

    const text = wrapper.find('.channel-list__channel-name-prefix').map((c) => c.text().trim());

    expect(text).toStrictEqual([
      '#',
      '#',
      '#',
      '#',
    ]);
  });

  it('renders Link to channel id', () => {
    const channels = [
      { id: 'one', name: 'first channel' },
      { id: 'two', name: 'second channel' },
      { id: 'three', name: 'third channel' },
      { id: 'four', name: 'fourth channel' },
    ];

    const wrapper = subject({ channels });

    const text = wrapper.find(ZnsLink).map((l) => l.prop('to'));

    expect(text).toStrictEqual([
      'one',
      'two',
      'three',
      'four',
    ]);
  });

  it('rpasses className prop', () => {
    const channels = [
      { id: 'one', name: 'first channel', category: 'catg1' },
      { id: 'two', name: 'second channel', category: 'catg1' },
      { id: 'three', name: 'third channel', category: 'catg2' },
      { id: 'four', name: 'fourth channel', category: 'catg2' },
    ];

    const wrapper = subject({ channels });
    const text = wrapper.find(Collapsible).map((l) => l.prop('className'));

    expect(text).toStrictEqual([
      'channel-list__category-channel-name',
      'channel-list__category-channel-name',
    ]);
  });

  it('renders grouped category', () => {
    const channels = [
      { id: 'one', name: 'first channel', category: 'catg1' },
      { id: 'two', name: 'second channel', category: 'catg1' },
      { id: 'three', name: 'third channel', category: 'catg2' },
      { id: 'four', name: 'fourth channel', category: 'catg2' },
    ];

    const wrapper = subject({ channels });
    const text = wrapper.find(Collapsible).map((l) => l.prop('trigger'));

    expect(text).toStrictEqual([
      'catg1',
      'catg2',
    ]);
  });

  it('renders channels that don t have a category', () => {
    const channels = [
      { id: 'one', name: 'first channel' },
      { id: 'two', name: 'second channel', category: 'catg1' },
      { id: 'three', name: 'third channel', category: 'catg2' },
      { id: 'four', name: 'fourth channel' },
    ];

    const wrapper = subject({ channels });
    const text = wrapper.find(Collapsible).map((l) => l.prop('trigger'));

    expect(text).toStrictEqual([
      '#',
      'catg1',
      'catg2',
    ]);
  });

  it('renders channels that don t have a category', () => {
    const channels = [
      { id: 'one', name: 'first channel' },
      { id: 'two', name: 'second channel' },
      { id: 'three', name: 'third channel', category: 'catg2' },
      { id: 'four', name: 'fourth channel' },
    ];

    const wrapper = subject({ channels });
    const text = wrapper.find('.channel-list__channel-name').map((c) => c.text().trim());

    expect(text).toStrictEqual([
      'first channel',
      'second channel',
      'fourth channel',
      'third channel',
    ]);
  });
});
