import * as React from "react";
import { Button } from "react-bootstrap";
import {
  cancelOrder,
  finishOrder
} from "../../../Redux/ActionFiles/VendorActions";
import { Order, OrderItem } from "../../../Redux/InterfaceFiles/types";
import { connect } from "react-redux";

interface VendorOrderQueueItemProps extends VendorOrderQueueItemDispatchProps {
  order: Order;
}

interface VendorOrderQueueItemDispatchProps {
  finishOrder: any;
}

export class VendorOrderItem extends React.Component<
  VendorOrderQueueItemProps
> {
  handleFinish() {
    this.props.finishOrder(this.props.order);
  }

  render() {
    return (
      <>
        <tr>
          <td>{this.props.order.id}</td>
          <td>{this.props.order.customer.name}</td>
          <td>
            {" "}
            <ul>
              {this.props.order.items &&
                this.props.order.items.map((order: OrderItem) => {
                  return (
                    <li>
                      {order.quantity} x: {order.name}
                    </li>
                  );
                })}
            </ul>
          </td>
          <td>{this.props.order.price}</td>
          <td>
            <div className="finish" style={{ display: "flex" }}>
              <Button variant="primary" onClick={() => this.handleFinish()}>
                Finish
              </Button>
            </div>
          </td>
        </tr>
      </>
    );
  }
}

const mapDispatchToProps = (
  dispatch: any
): VendorOrderQueueItemDispatchProps => ({
  finishOrder: (order: Order) => dispatch(finishOrder(order))
});

const VendorOrderQueueItem = connect(null, mapDispatchToProps)(VendorOrderItem);

export default VendorOrderQueueItem;
