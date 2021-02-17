import React, { Component } from "react";

import * as wjcCore from "@grapecity/wijmo";
import {
  InputNumber,
  InputDateTime,
  ComboBox,
  AutoComplete
} from "@grapecity/wijmo.react.input";
import { FlexChart, FlexChartSeries } from "@grapecity/wijmo.react.chart";
import {
  FlexGrid,
  FlexGridColumn,
  FlexGridCellTemplate
} from "@grapecity/wijmo.react.grid";
import { GroupPanel } from "@grapecity/wijmo.react.grid.grouppanel";
import { FlexGridFilter } from "@grapecity/wijmo.react.grid.filter";
import { FlexGridDetail } from "@grapecity/wijmo.react.grid.detail";

import { countries, getAppData } from "./data";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.countries = countries;
    let appData = getAppData(100);
    this.data = appData.data;
    this.chartData = appData.chartData;
    this.state = {
      name: "React",
      theNumberValue: 3.14,
      theDateTimeValue: new Date(),
      theComboBoxValue: this.countries[0],
      theAutoCompleteValue: this.countries[0]
    };
  }

  render() {
    return (
      <div className="container-fluid">
        <h1>Wijmo UI Components for React</h1>
        <p>
          You can use this project as a template to quickly create your React
          application. Try the{" "}
          <a
            href="https://stackblitz.com/edit/wijmo-angular-templates?file=src%2Fapp%2Fapp.component.html"
            target="_blank"
          >
            Wijmo Angular
          </a>{" "}
          and{" "}
          <a
            href="https://stackblitz.com/edit/wijmo-vue3-templates?file=src%2FApp.vue"
            target="_blank"
          >
            Vue template
          </a>{" "}
          too!
        </p>
        <p>
          Wijmo offers a complete suite of enterprise&nbsp;
          <a
            href="https://www.grapecity.com/wijmo/react-ui-components?utm_source=stackblitzwebsite&utm_medium=prospects&utm_campaign=stackblitznov20"
            target="_blank"
          >
            React UI components
          </a>
          &nbsp; including inputs, charts, navigation and a powerful&nbsp;
          <a
            href="https://www.grapecity.com/wijmo/react-ui-components/flexgrid-react-data-grid?utm_source=stackblitzwebsite&utm_medium=prospects&utm_campaign=stackblitznov20"
            target="_blank"
          >
            React DataGrid
          </a>
          .
        </p>
        <p>
          <strong>
            Make sure to{" "}
            <a
              href="https://www.grapecity.com/download/wijmo-enterprise?utm_source=stackblitzwebsite&utm_medium=prospects&utm_campaign=stackblitznov20"
              target="_blank"
            >
              download the Wijmo Developer kit
            </a>{" "}
            to get thousands of sample applications using JavaScript, Angular,
            React and Vue!
          </strong>
        </p>

        <h3>React DataGrid Component</h3>
        <hr />
        <p>
          The <b>FlexGrid</b> control provides a powerful and flexible way to
          display and edit data in a tabular format.
        </p>
        <div className="flexgrid-container">
          <GroupPanel
            grid={this.state.theFlexGrid}
            placeholder="Drag columns here to create groups"
          />

          <FlexGrid
            autoGenerateColumns={false}
            showMarquee={true}
            selectionMode="MultiRange"
            itemsSource={this.data}
            initialized={s => this._handleFlexGridInitialize(s)}
          >
            <FlexGridFilter />

            <FlexGridDetail
              isAnimated={true}
              template={ctx => (
                <React.Fragment>
                  <b>Details:</b>
                  <ul>
                    <li>
                      ID: <b>{ctx.item.id}</b>
                    </li>
                    <li>
                      Country: <b>{ctx.item.country}</b>
                    </li>
                    <li>
                      Date: <b>{ctx.item.date.toString()}</b>
                    </li>
                    <li>
                      Downloads: <b>{ctx.item.downloads}</b>
                    </li>
                    <li>
                      Sales: <b>{this._format(ctx.item.sales, "c2")}</b>
                    </li>
                    <li>
                      Active: <b>{ctx.item.active.toString()}</b>
                    </li>
                  </ul>
                </React.Fragment>
              )}
            />

            <FlexGridColumn binding="id" header="ID" />
            <FlexGridColumn binding="country" header="Country">
              <FlexGridCellTemplate
                cellType="Cell"
                template={ctx => (
                  <React.Fragment>
                    <span
                      className={`flag-icon flag-icon-${ctx.item.country.toLowerCase()}`}
                    />
                    &nbsp;{ctx.item.country}
                  </React.Fragment>
                )}
              />
            </FlexGridColumn>
            <FlexGridColumn binding="date" header="Date" />
            <FlexGridColumn binding="downloads" header="Downloads" />
            <FlexGridColumn binding="sales" header="Sales" format="c2" />
            <FlexGridColumn binding="active" header="Active" />
          </FlexGrid>
        </div>

        <h3>React Input Components</h3>
        <hr />
        <div className="form-horizontal">
          <p>
            The <b>InputNumber</b> control with currency format specified.
          </p>
          <div className="form-group">
            <label htmlFor="theNumber" className="col-sm-2 control-label">
              InputNumber
            </label>
            <div className="col-sm-10">
              <InputNumber
                format="c2"
                value={this.state.theNumberValue}
                valueChanged={s => this._handleNumberChange(s)}
                id="theNumber"
                aria-describedby="theNumberDesc"
              />
              <span id="theNumberDesc" className="help-block">
                The current value is{" "}
                <b>{this._format(this.state.theNumberValue, "c2")}</b>
              </span>
            </div>
          </div>

          <p>
            The <b>InputDateTime</b> control combines two controls into one:{" "}
            <b>InputDate</b> and <b>InputTime</b>.
          </p>
          <div className="form-group">
            <label htmlFor="theDateTime" className="col-sm-2 control-label">
              InputDateTime
            </label>
            <div className="col-sm-10">
              <InputDateTime
                value={this.state.theDateTimeValue}
                valueChanged={s => this._handleDateTimeChange(s)}
                id="theDateTime"
                aria-describedby="theDateTimeDesc"
              />
              <span id="theDateTimeDesc" className="help-block">
                The current date/time is{" "}
                <b>{this._format(this.state.theDateTimeValue, "f")}</b>.
              </span>
            </div>
          </div>

          <p>
            The <b>ComboBox</b> control combines an input element with a
            drop-down list.
          </p>
          <div className="form-group">
            <label htmlFor="theComboBox" className="col-sm-2 control-label">
              ComboBox
            </label>
            <div className="col-sm-10">
              <ComboBox
                itemsSource={this.countries}
                textChanged={s => this._handleComboBoxChange(s)}
                id="theComboBox"
                aria-describedby="theComboBoxDesc"
              />
              <span id="theComboBoxDesc" className="help-block">
                The current country is <b>{this.state.theComboBoxValue}</b>
              </span>
            </div>
          </div>

          <p>
            The <b>AutoComplete</b> control extends the <b>ComboBox</b> control.
            It automatically filters items in dropdown from user input.
          </p>
          <div className="form-group">
            <label htmlFor="theAutoComplete" className="col-sm-2 control-label">
              AutoComplete
            </label>
            <div className="col-sm-10">
              <AutoComplete
                itemsSource={this.countries}
                textChanged={s => this._handleAutoCompleteChange(s)}
                id="theAutoComplete"
                aria-describedby="theAutoCompleteDesc"
              />
              <span id="theAutoCompleteDesc" className="help-block">
                The current country is <b>{this.state.theAutoCompleteValue}</b>
              </span>
            </div>
          </div>
        </div>

        <h3>React Chart Component</h3>
        <hr />
        <p>
          The <b>FlexChart</b> control provides a powerful and flexible way to
          visualize data.
        </p>
        <div className="flexchart-container">
          <FlexChart
            itemsSource={this.chartData}
            header="Sales by Country"
            bindingX="country"
          >
            <FlexChartSeries name="Jan" binding="Jan" />
            <FlexChartSeries name="Feb" binding="Feb" />
            <FlexChartSeries name="Mar" binding="Mar" />
          </FlexChart>
        </div>
      </div>
    );
  }

  _handleNumberChange(s) {
    this.setState({
      theNumberValue: s.value
    });
  }

  _handleDateTimeChange(s) {
    this.setState({
      theDateTimeValue: s.value
    });
  }

  _handleComboBoxChange(s) {
    this.setState({
      theComboBoxValue: s.text
    });
  }

  _handleAutoCompleteChange(s) {
    this.setState({
      theAutoCompleteValue: s.text
    });
  }

  _handleFlexGridInitialize(s) {
    this.setState({
      theFlexGrid: s
    });
  }

  _format(value, format) {
    return wjcCore.Globalize.format(value, format);
  }
}
