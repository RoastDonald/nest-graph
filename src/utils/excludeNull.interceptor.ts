import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

export class ExcludeNullInterceptor implements NestInterceptor {
    intercept(ctx: ExecutionContext,next: CallHandler):Observable<any> {
        return next.handle().pipe(map((value=>recursivelyStripNullValues(value))))
    }
}