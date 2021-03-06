import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { observer } from 'mobx-react';
import FaIconClock from 'react-icons/lib/fa/clock-o';
import MdLocationOn from 'react-icons/lib/md/location-on';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import IconButton from 'material-ui/IconButton';
import {red500} from 'material-ui/styles/colors';
import MdUnCheck  from 'react-icons/lib/md/check-box-outline-blank';
import MdClose from 'react-icons/lib/md/replay';
import TaskService from '../../services/task';
import styles from './style';

@observer
class Lists extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.renderTask = this.renderTask.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onToggle(key, value) {
    TaskService.onToggle(key, value);
  }

  onDelete(key) {
    TaskService.onDelete(key);
  }

  renderItemContent(task) {
    const { description, category, starttime, endtime, location } = task;

    return (
      <div style={{height: 'initial'}}>
        <div style={styles.timeLocation}>
          <span style={{display: 'flex'}}><FaIconClock />&nbsp;{starttime} – {endtime} &nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span style={{display: 'flex'}}><MdLocationOn />&nbsp;{location}</span>
        </div>
        <div style={{display: 'flex'}}>{category}</div>
        <div style={{color: '#1D1D26', opacity: '0.8', fontSize: 18}}>{description}</div>
      </div>
    );
  }

  renderItemRight(key, task) {
    const { completed } = this.props;
    const icon = !!completed ? <MdClose size={30} color={red500} /> : <MdUnCheck size={30} color={red500}/>;

    return (
      <IconButton
        onTouchTap={() => (this.onToggle(key, !completed))}
      >
        {icon}
      </IconButton>
    );
  }

  renderTask(task, key) {
    const { name, description, starttime, endtime, location } = task;
    const category = null;

    return (
      [
        <ListItem
          style={styles.containerListItem}
          key={key}
          primaryText={
            <span style={styles.nameItem}>{name}</span>
          }
          secondaryTextLines={2}
          rightIconButton={this.renderItemRight(key, task)}
          secondaryText={this.renderItemContent({ category, name, description, starttime, endtime, location })}
        />,
        <Divider />
      ]
    );
  }

  render() {
    const { completed, data } = this.props
    const subTitle = !!completed ? 'Completed' : 'UnCompleted';
    const tasks = (data || TaskService)[subTitle];

    return (
      <List style={styles.containerList}>
        {Object.keys(tasks).map((key) => this.renderTask(tasks[key], key))}
      </List>
    )
  }
}

export default withRouter(Lists);
