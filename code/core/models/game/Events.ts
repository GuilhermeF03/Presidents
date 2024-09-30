import { z } from "zod";
import { ZodPlayerOpInput } from "./Input";
import { ZodCard } from "./Card";

const ZodBaseGameEvent = ZodPlayerOpInput;

const ZodCardEvent = ZodBaseGameEvent.extend({
    card : ZodCard,
});

