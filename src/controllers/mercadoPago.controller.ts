import {
  Body,
  Controller,
  Post,
  Route,
  SuccessResponse,
  Security,
  Request,
  Get,
} from "tsoa";

import mercadopago from "mercadopago";
import { CreatePreferencePayload } from "mercadopago/models/preferences/create-payload.model";

const accessToken = process.env.ACCESS_TOKEN_MP || "";

mercadopago.configurations.setAccessToken(accessToken);

// interface PreferenceRequest {
//   id: number;
//   name: String;
//   image: String;
//   price: number;
//   currency: string;
//   // quantity: number;
//   description: string;
//   preferenceId?: string;
// }

@Route("mp")
export class MercadoPagoController extends Controller {

  @SuccessResponse("200")
  @Security("jwks", ["user"])
  @Post("preference")
  public async preference(@Body() req: any): Promise<any> {
    try {
      // https://www.mercadopago.com.br/developers/pt/docs/checkout-pro-v1/configurations
      const preference: CreatePreferencePayload = {
        items: [
          {
            title: req.nft.description,
            unit_price: Number(req.nft.price),
            quantity: 1, //Number(req.body.quantity),
          },
        ],
        back_urls: {
          success: `http://localhost:3003/api/v1/mp/feedback`, //`${req.headers.origin}/api/feedback`,
          failure: `http://localhost:3003/api/v1/mp/feedback`,
          pending: `http://localhost:3003/api/v1/mp/feedback`,
        },
        auto_return: "approved",
      };
      const response = await mercadopago.preferences.create(preference);

      // TODO: ADD TO ORDER TABLE 

      return { id: response.body.id };
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  @SuccessResponse("200")
  @Get("feedback")
  public async feedback(@Request() req: any): Promise<any> {
    const {
      query: { status },
    } = req;

    if (status === "APRO") {
      // TODO: send to eth.service to mint
    }

    return {
      Payment: req.query.payment_id,
      Status: req.query.status,
      MerchantOrder: req.query.merchant_order_id,
    };
  }

  // TODO: create a schedule to check if the payment was approved on MP
}
