
import React, { Component} from 'react';
import model from '../model';

export default class ModelComponent extends Component {
	constructor(params) {
		super(params);
	}

	model = model

	_modelReloaded = () => this.forceUpdate()

	componentDidMount() {
		model.on('reload', this._modelReloaded);
	}

	componentWillUnmount() {
		model.off('reload', this._modelReloaded);
	}
}
