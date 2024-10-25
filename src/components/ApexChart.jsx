import React from "react";
import ReactApexChart from "react-apexcharts";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          type: "line",
          toolbar: {
            show: false,
          },
        },
        stroke: {
          width: 5,
          curve: "smooth",
        },
        xaxis: {
          type: "datetime",
          tickAmount: 3,
          labels: {
            formatter: function (value, timestamp, opts) {
              return opts.dateFormatter(new Date(timestamp), "MMM dd");
            },
            offsetX: 8,
            style: {
              colors: "#808080",
              fontSize: "12px",
              fontFamily: "Raleway, sans-serif",
              fontWeight: 500,
            },
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          labels: {
            formatter: function (val, index) {
              return val.toFixed(3);
            },
            style: {
              colors: "#808080",
              fontSize: "14px",
              fontFamily: "Raleway, sans-serif",
              fontWeight: 500,
            },
          },
        },
        fill: {
          colors: ["#FB7D7A"],
          type: "gradient",
          gradient: {
            shade: "dark",
            gradientToColors: ["#AA92FF"],
            shadeIntensity: 1,
            type: "vertical",
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 90, 100],
          },
        },
        noData: {
          text: "History is unavailable",
          offsetX: 30,
          style: {
            color: "#808080",
            fontSize: "16px",
            fontFamily: "Raleway, sans-serif",
          },
        },
      },
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isLoading !== this.props.isLoading) {
      this.setState({
        options: {
          noData: {
            text: this.props.isLoading ? "Loading..." : "History unavailable",
          },
        },
      });
    }

    if (
      this.props.error &&
      prevProps.error !== this.props.error &&
      this.props.error.message
    ) {
      this.setState({
        options: {
          noData: {
            text: this.props.error.message,
          },
        },
      });
    }
  }

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={[
              {
                name: "Exchange Rate",
                data: this.props.data,
              },
            ]}
            type="line"
            height={220}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default ApexChart;
