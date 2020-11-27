import React from "react"

import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "./identity-context"

export const wrapRootElement = ({ element }) => (
  <Provider>{element}</Provider>
)