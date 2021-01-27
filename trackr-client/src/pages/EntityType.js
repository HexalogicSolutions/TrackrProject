import React, { Component } from "react";
import { Form, Alert } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import { addEntityType, updateEntityType } from "../actions/auth";

class EntityType extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
    // this.inputRef= React.createRef();
    this.myRefs = [];

    this.state = {
      title: "",
      buttonText: "",
      name: "",
      code: "",
      color: "",
      variant: null,
      msg: "",
      active: false,
      editEntityType: false,
      token: localStorage.getItem("token"),
    };
  }

  onChange = (e) => {
    if (e.target.name === "code") {
      this.setState({
        [e.target.name]: e.target.value.toUpperCase(),
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  resetForm() {
    this.setState({
      name: "",
      code: "",
      active: false,
    });
  }

  handleBack() {
    this.props.history.goBack();
  }

  async componentDidMount() {
    console.log(this.myRefs);

    // const url = "/api/entitytype";
    // fetch(url)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     let entitytypeFromAPI = data.map((ett) => {
    //       return { value: ett.ett_code, display: ett.ett_name };
    //     });
    //     this.setState({
    //       groups: [{ id: "0", value: "", display: "" }].concat(
    //         entitytypeFromAPI
    //       ),
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    console.log(this.context.currentObject);

    const ettcode = this.context.currentObject
      ? this.context.currentObject
      : "";
    this.state.editEntityType = this.context.currentObject ? true : false;

    if (this.state.editEntityType) {
      this.myRefs[1].focus();
      this.state.title = "Edit Entity Type";
      this.state.buttonText = "Update";

      const url = "/api/entitytype/" + ettcode;

      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.ett_name);
          this.setState({
            code: data.ett_code,
            name: data.ett_name,
            active: data.ett_active,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // this.myRefs[1].focus();
      this.state.title = "New Entity Type";
      this.state.buttonText = "Add";
    }
  }

  onSubmit = (e) => {
    console.log("submit");

    // this.goBack();

    setTimeout(() => this.setState({ msg: "" }), 2000);
    e.preventDefault();
    const { name, active, code } = this.state;

    console.log(this.state.editEntityType);
    console.log("active " + active);

    if (this.state.editEntityType) {
      console.log("in edit Group");
      const newett = {
        code,
        name: name.trim(),
        active,
      };

      updateEntityType(newett, (res) => {
        if (res.data.success) {
          this.context.setCurrentMsg(res.data.msg);
          this.context.setCurrentVariant("success");
          this.context.setCurrentColor("alert alert-success");
          this.handleBack();
          // this.setState({
          //   msg: res.data.msg,

          //   variant: "success",
          // });
          this.resetForm();
          // setTimeout(() => this.setState({msg:''}), 2000);
        } else {
          this.context.setCurrentMsg(res.data.msg);
          this.context.setCurrentVariant("danger");
          this.context.setCurrentColor("alert alert-danger");

          this.setState({
            msg: res.data.msg,
            variant: "danger",
            color: "alert alert-danger",
          });
          // setTimeout(() => this.setState({msg:''}), 2000);
        }
      });
    } else {
      const newett = {
        code,
        name: name.trim(),
        active: true,
      };

      //Register
      addEntityType(newett, (res) => {
        if (res.data.success) {
          this.context.setCurrentMsg(res.data.msg);
          this.context.setCurrentVariant("success");
          this.context.setCurrentColor("alert alert-success");
          this.handleBack();
          // this.setState({
          //   msg: res.data.msg,
          //   variant: "success",
          // });

          // setTimeout(() => this.setState({msg:''}), 2000);
          this.resetForm();
        } else {
          this.context.setCurrentMsg(res.data.msg);
          this.context.setCurrentVariant("danger");
          this.setState({
            msg: res.data.msg,
            variant: "danger",
            color: "alert alert-danger",
          });
          // setTimeout(() => this.setState({msg:''}), 2000);
        }
      });
    }
  };

  render() {
    //console.log(this.state.groups);
    return (
      <div>
        <div
          className="container header detail"
          style={{
            height: "65px",
            marginBottom: "-35px",
            backgroundColor: "#34444c",
            color: "white",
            borderRadius: "20px 20px 0px 0px",
          }}
        >
          <center>
            <h4 style={{ paddingTop: "5px", fontSize: "20px" }}>
              {this.state.title}
            </h4>
          </center>
        </div>
        <div
          className="container header detail"
          style={{ borderRadius: "0px 0px 20px 20px" }}
        >
          <div>
            <br></br>
            <Form onSubmit={this.onSubmit} id="ettedit">
              {/* {this.state.msg ? (
              <Alert variant={this.state.variant}>{this.state.msg}</Alert>
            ) : null} */}
              {this.state.msg ? (
                // <Alert variant={this.state.variant}>{this.state.msg}</Alert>
                <div class={this.state.color}>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="alert"
                    aria-hidden="true"
                    color={this.state.variant}
                  >
                    &times;
                  </button>
                  <h4>
                    <i class="icon fa fa-info"></i> {this.state.msg}
                  </h4>
                </div>
              ) : null}

              <form-group>
                <div>
                  <div className="form-group ">
                    <label
                      className={
                        !this.state.editEntityType ? "hidden" : "labelstd"
                      }
                    >
                      Code:
                    </label>
                    <span className="myspan ">
                      <div className="form__div ">
                        <input
                          // className="myinput fadeIn second"
                          class="detail__input textsmall "
                          id="myInput"
                          type={!this.state.editEntityType ? "hidden" : "text"}
                          name="code"
                          ref={this.state.editEntityType ? "this.inputRef" : ""}
                          disabled={this.state.editEntityType ? true : false}
                          // ref={(el) => (this.myRefs[0] = el)}
                          value={this.state.code}
                          onChange={this.onChange}
                        />
                      </div>
                    </span>

                    <div className="form-group" style={{ marginTop: "-22px" }}>
                      <label className="labelstd">Name:</label>
                      <span className="myspan">
                        <div className="form__div">
                          <input
                            className="detail__input"
                            type="text"
                            name="name"
                            // type={this.state.editUser ? 'hidden': 'text'}
                            value={this.state.name}
                            ref={(el) => (this.myRefs[1] = el)}
                            onChange={(event) => {
                              this.setState({ name: event.target.value });
                            }}
                            required
                          />
                        </div>
                      </span>
                      <br></br>
                      <div
                        className="form-group"
                        style={{ marginTop: "-45px" }}
                      >
                        <label
                          className={
                            !this.state.editEntityType ? "hidden" : "labelstd"
                          }
                        >
                          Active:
                        </label>
                        <span className="myspan">
                          <div className="form__div">
                            <input
                              // type="checkbox"
                              name="active"
                              type={
                                !this.state.editEntityType
                                  ? "hidden"
                                  : "checkbox"
                              }
                              // value={this.state.enabled}
                              checked={this.state.active}
                              ref={(el) => (this.myRefs[2] = el)}
                              onChange={(event) => {
                                this.setState({ active: event.target.checked });
                              }}
                            ></input>
                          </div>
                        </span>
                        <br></br>
                        <center>
                          <button
                            type="submit"
                            className="btn btn-primary"
                            style={{
                              width: "110px",
                              height: "35px",
                              marginBottom: "50px",
                            }}
                          >
                            {this.state.buttonText}
                          </button>
                        </center>
                      </div>
                    </div>
                  </div>
                </div>
              </form-group>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default EntityType;
