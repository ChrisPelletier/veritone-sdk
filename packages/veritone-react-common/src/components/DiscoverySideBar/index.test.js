import React from 'react';
import { noop } from 'lodash';
import { mount } from 'enzyme';

import { DiscoverySideBarContainerPure as Sidebar } from './';

const defaultProps = {
  tabs: ['one'],
  selectedTab: 'one',
  onSelectTab: noop
};

describe('DiscoverySideBarContainerPure', function() {
  it('Should render a Header', function() {
    const wrapper = mount(<Sidebar {...defaultProps} />);

    expect(wrapper.find('DiscoverySidebarHeader')).toHaveLength(1);
  });

  it('should render a rightIconButton into the header if props.clearAllFilters is true', function() {
    const wrapper = mount(<Sidebar {...defaultProps} />);
    expect(
      wrapper.find('DiscoverySidebarHeader').find('IconButton')
    ).toHaveLength(0);

    wrapper.setProps({ clearAllFilters: true });
    expect(
      wrapper.find('DiscoverySidebarHeader').find('IconButton')
    ).toHaveLength(1);
  });

  it('should call props.onClearAllFilters when the rightIconButton is clicked', function() {
    const handler = jest.fn();
    const wrapper = mount(
      <Sidebar {...defaultProps} clearAllFilters onClearAllFilters={handler} />
    );

    wrapper
      .find('DiscoverySidebarHeader')
      .find('IconButton')
      .simulate('click');

    expect(handler).toHaveBeenCalled();
  });

  it('should show the filters container if props.selectedTab is Filters', function() {
    const wrapper = mount(<Sidebar {...defaultProps} selectedTab="Filters" />);
    expect(wrapper.find('[data-testtarget="filters"]')).toHaveLength(1);
  });

  it('should show the browse container if props.selectedTab is Browse', function() {
    const wrapper = mount(<Sidebar {...defaultProps} selectedTab="Browse" />);
    expect(wrapper.find('[data-testtarget="browse"]')).toHaveLength(1);
  });
});
