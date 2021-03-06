import React from 'react';
import { mount } from 'enzyme';
import _ from 'lodash';
import Button from 'material-ui/Button';
import FilePickerFooter from './FilePickerFooter';

describe('FilePickerFooter', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(<FilePickerFooter />);
    })

    it('should have an "Upload" button and a "Cancel" button', () => {
        const buttons = wrapper.find(Button);
        let buttonTexts = ["Upload", "Cancel"];
        buttons.forEach((button) => {
            expect(
                _.includes(buttonTexts, button.find(".MuiButton-label-3").text())
            ).toEqual(true);
        });
    })
})