import * as React from "react";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import { RootState } from "../../../Redux/StoreFiles/store";
import { vendorUpdateProfile } from "../../../Redux/ActionFiles/VendorActions";
import { VendorInfo, VendorHours } from "../../../Redux/InterfaceFiles/types";
import { connect } from "react-redux";

interface VendorProfileEditorFieldsProps
  extends VendorProfileEditorFieldsDispatchProps {
  id?: number;
  name?: string;
  description?: string;
  cuisine?: string;
  hours?: VendorHours;
  phone?: number;
  city?: string;
  state?: string;
  address?: string;
}

export function StringtoNumberTime(timeStr: string): number {
  let hours = parseInt(timeStr.substring(0, 2)) * 100;
  let mins = parseInt(timeStr.substring(3));
  let time = hours + mins;
  return time;
}

export function NumbertoStringTime(timeNum: number): string {
  let time = timeNum.toString();

  if (timeNum < 10) {
    time = "00:0" + time;
  } else if (timeNum < 100) {
    time = "00:" + time;
  } else if (timeNum < 1000) {
    time = "0" + time;
    time = time.substring(0, 2) + ":" + time.substring(2);
  } else {
    time = time.substring(0, 2) + ":" + time.substring(2);
  }

  return time;
}

interface VendorProfileEditorFieldsDispatchProps {
  updateProfile?: any;
}

interface VendorProfileEditorFieldsState {
  nameField: any;
  descriptionField: any;
  cuisineField: any;
  beginHoursField: any;
  endHoursField: any;
  phoneField: any;
  cityField: any;
  stateField: any;
  AddressField: any;
}

class ProfileEditorFields extends React.Component<
  VendorProfileEditorFieldsProps,
  VendorProfileEditorFieldsState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      nameField: React.createRef(),
      descriptionField: React.createRef(),
      cuisineField: React.createRef(),
      beginHoursField: React.createRef(),
      endHoursField: React.createRef(),
      phoneField: React.createRef(),
      cityField: React.createRef(),
      stateField: React.createRef(),
      AddressField: React.createRef()
    };
  }

  handleSubmit() {
    if (this.props.id) {
      const vendor: VendorInfo = {
        id: this.props.id,
        name: this.state.nameField.current.value,
        description: this.state.descriptionField.current.value,
        cuisine: this.state.cuisineField.current.value,
        hours: {
          open: StringtoNumberTime(this.state.beginHoursField.current.value),
          close: StringtoNumberTime(this.state.endHoursField.current.value)
        },
        phone: Number(this.state.phoneField.current.value),
        city: this.state.cityField.current.value,
        state: this.state.stateField.current.value,
        address: this.state.AddressField.current.value,
        menu: []
      };
      this.props.updateProfile(vendor);
    } else console.log("You must sign in before using the profile editor");
  }

  render() {
    return (
      <Container>
        <Form>
          <Row>
            <Col>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  ref={this.state.nameField}
                  defaultValue={this.props.name}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  ref={this.state.descriptionField}
                  type="text"
                  defaultValue={this.props.description}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Cuisine</Form.Label>
                <Form.Control
                  ref={this.state.cuisineField}
                  type="text"
                  defaultValue={this.props.cuisine}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  ref={this.state.cityField}
                  type="text"
                  defaultValue={this.props.city}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="formState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  ref={this.state.stateField}
                  defaultValue={this.props.state}
                ></Form.Control>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="formBeginHours">
                <Row>
                  <Col>
                    <Form.Label>Opening</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      ref={this.state.beginHoursField}
                      type="time"
                      defaultValue={
                        this.props.hours &&
                        NumbertoStringTime(this.props.hours.open)
                      }
                    ></Form.Control>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Closing</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      ref={this.state.endHoursField}
                      type="time"
                      defaultValue={
                        this.props.hours &&
                        NumbertoStringTime(this.props.hours.close)
                      }
                    ></Form.Control>
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  ref={this.state.phoneField}
                  type="number"
                  defaultValue={this.props.phone}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  ref={this.state.AddressField}
                  type="text"
                  defaultValue={this.props.address}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Button
            variant="primary"
            type="submit"
            onClick={() => this.handleSubmit()}
          >
            Update Profile
          </Button>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = (state: RootState): VendorProfileEditorFieldsProps => ({
  id: state.vendor.profile.id,
  name: state.vendor.profile.name,
  description: state.vendor.profile.description,
  cuisine: state.vendor.profile.cuisine,
  hours: state.vendor.profile.hours,
  phone: state.vendor.profile.phone,
  city: state.vendor.profile.city,
  state: state.vendor.profile.state,
  address: state.vendor.profile.address
});

const mapDispatchToProps = (
  dispatch: any
): VendorProfileEditorFieldsDispatchProps => ({
  updateProfile: (vendor: VendorInfo) => dispatch(vendorUpdateProfile(vendor))
});

const VendorProfileEditorFields = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileEditorFields);

export default VendorProfileEditorFields;
