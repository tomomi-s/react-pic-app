import React from "react";
import Enzyme, { shallow, render, mount } from "enzyme";
import { createSerializer } from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";

import { PostItem } from './PostItem';
import { setCurrentPost } from '../../action/postActions';

expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));

Enzyme.configure({ adapter: new Adapter() });

const post = {
	photo_before: {
		path: "/files/photo_before.jpg"
	},
	photo_after: {
		path: "/files/photo_after.jpg"
	},
	tool: 2,
	process: "Filter: C1"
}



it('render', ()=>{
	const wrapper = render(<PostItem post={post} setCurrentPost={setCurrentPost} />);
 	expect(wrapper).toMatchSnapshot();	
})

it('fire setCurrentPost function', ()=>{
	const mock = jest.fn();
	const wrapper = shallow(<PostItem post={post} setCurrentPost={mock} />);
	wrapper.find('.modal-trigger').simulate('click');
	expect(mock).toHaveBeenCalledTimes(1);
})