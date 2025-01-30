//! # javascript code!
// const catchAsync = (fn) => {
//     return (req, res, next) => {
//       fn(req, res, next).catch(next);
//     };
//   };

//   export default catchAsync;

// TODO: TypeScript

import { Request, Response, NextFunction } from "express";

const catchAsync = <
  T extends (req: Request, res: Response, next: NextFunction) => Promise<any>
>(
  fn: T
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
