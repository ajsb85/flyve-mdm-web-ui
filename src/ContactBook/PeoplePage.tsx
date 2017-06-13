import * as React from 'react'
import ReactWinJS = require ('react-winjs') 
import Calc100PercentMinus from '../Utils/Calc100PercentMinus'
import ProfilePicture from './ProfilePicture'
var WinJS = require('winjs')

export default class PeoplePage extends React.Component<any, any> {

    constructor(props){
        super(props)
        this.state = {
            layout: { type: WinJS.UI.ListLayout },
            selectedPeople: [],
            selectionMode: false
        }
    }

    personRenderer =  ReactWinJS.reactRenderer(function (person) {
        return (
            <div>
                <ProfilePicture backgroundUrl={person.data.picture} size={34} />
                <span className="name">{person.data.name}</span>
            </div>
        )
    })


    groupHeaderRenderer = ReactWinJS.reactRenderer(function (item) {
        return (
            <div>{item.data.title}</div>
        )
    })
    
    renderPeoplePane (peoplePaneWidth) {
        var deleteCommand = (
            <ReactWinJS.ToolBar.Button
                key="delete"
                icon="delete"
                priority={0}
                disabled={this.state.selectedPeople.length === 0}
            />
        )

        return (
            <div className="peopleSearchPane" style={{height: "100%", width: peoplePaneWidth, display: "inline-block", verticalAlign:"top"}}>
                <ReactWinJS.ToolBar className="peopleToolBar">
                    <ReactWinJS.ToolBar.Button
                        key="edit"
                        icon="edit"
                        label="Edit"
                        priority={4} />
                    <ReactWinJS.ToolBar.Button
                        key="favorite"
                        icon="favorite"
                        label="Favorite"
                        priority={3} />
                    <ReactWinJS.ToolBar.Button
                        key="link"
                        icon="link"
                        label="Link"
                        priority={2} />
                    <ReactWinJS.ToolBar.Button
                        key="refresh"
                        icon="refresh"
                        label="Refresh"
                        priority={1} />

                    <ReactWinJS.ToolBar.Button
                        key="add"
                        icon="add"
                        label="Add"
                        priority={0} />
                    {this.state.selectionMode ? deleteCommand : null}
                    <ReactWinJS.ToolBar.Toggle
                        key="select"
                        icon="bullets"
                        label="Select"
                        priority={0}
                        selected={this.state.selectionMode}
                    />
                </ReactWinJS.ToolBar>

                <ReactWinJS.ListView
                    ref="listView"
                    className="peopleListView win-selectionstylefilled"
                    style={{height: "calc(100% - 48px)"}}
                    itemDataSource={this.props.people.dataSource}
                    groupDataSource={this.props.people.groups.dataSource}
                    layout={this.state.layout}
                    itemTemplate={this.personRenderer}
                    groupHeaderTemplate={this.groupHeaderRenderer}
                    selectionMode={this.state.selectionMode ? "multi" : "single"}
                    tapBehavior={this.state.selectionMode ? "toggleSelect" : "directSelect"}
                />
            </div>
        )
    }

    renderProfilePane (selectedIndex, peoplePaneWidth) {
        if (selectedIndex === null) {
            return (
                <div className="profilePane" style={{height: "100%", width: Calc100PercentMinus(peoplePaneWidth), display: "inline-block",verticalAlign:"top"}}>
                    <div style={{display: "flex", height: "100%", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                        <h1 className="win-h1" style={{color: "grey"}}>No Selection</h1>
                    </div>
                </div>
            );
        } else {
            var selectedPerson = this.props.people.getAt(selectedIndex);
            return (
                <div className="profilePane" style={{height: "100%", width: Calc100PercentMinus(peoplePaneWidth), display: "inline-block",verticalAlign:"top"}}>
                    <div className="profileHeader">
                        <div className="name">{selectedPerson.name}</div>
                        <div className="personInfo">
                            <ProfilePicture backgroundUrl={selectedPerson.picture} size={100} />
                            <div className="profileStatus">
                                <span className="message">
                                    {selectedPerson.status}
                                </span>
                                <span className="source">{selectedPerson.statusHoursAgo} hours ago</span>
                            </div>
                        </div>
                    </div>
                    <div className="separator" />
                    <div className="profileContent">
                        <ul>
                            <li><span className="messageIcon" />Message</li>
                            <li>
                                <span className="phoneIcon" />
                                <div className="callContent">
                                    <a href="call:5550100">Call Mobile</a>
                                    <div className="number">{selectedPerson.mobilePhone}</div>
                                </div>
                            </li>
                            <li>
                                <span className="phoneIcon" />
                                <div className="callContent">
                                    <a href="call:5550100">Call Work</a>
                                    <div className="number">{selectedPerson.workPhone}</div>
                                </div>
                            </li>
                            <li><span className="phoneIcon" />Call using an app</li>
                            <li><span className="videoCallIcon" />Video call</li>
                            <li><span className="emailIcon" />Email work</li>
                            <li><span className="mapIcon" />Map home</li>
                        </ul>
                    </div>
                </div>
            );
        }
    }

    render () {
        var selectedIndex = this.props.location.length >= 2 ? this.props.location[1] : null;

        if (this.props.mode === "small") {
            if (selectedIndex === null) {
                return this.renderPeoplePane("100%")
            } else {
                return this.renderProfilePane(selectedIndex, 0)
            }
        } else {
            var peoplePaneWidth = 320
            return (
                <div style={{height: "100%"}}>
                    {this.renderPeoplePane(peoplePaneWidth)}
                    {this.renderProfilePane(selectedIndex, peoplePaneWidth)}
                </div>
            )
        }
    }
}