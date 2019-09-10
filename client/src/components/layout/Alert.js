import React from 'react';
import { connect } from 'react-redux';

const Alert = (alerts) => {
	return (
		alerts.alerts.length > 0 && alerts.alerts.map(alert => (
			<div key={alert.id} className="col 12 center-align">
				<h6 className="card-panel pink lighten-5 z-depth-0">
					<span className="red-text text-accent-3"><i className="fas fa-info-circle" />{alert.msg}</span>
				</h6>
			</div>
		))
	)
}

const mapStateToProps = state => ({
	alerts: state.alert
})

export default connect(mapStateToProps)(Alert);