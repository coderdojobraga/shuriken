import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useEvent } from "~/hooks/events";
import { useAuth, withAuth } from "~/components/Auth";
import * as USER from "~/lib/user";
import { Col, notification, Row, Title } from "antd";
import AppLayout from "~/components/layouts/AppLayout";

import { createAvailability, createEnrollment } from "~/lib/api";

function Event() {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  const { data: event, isLoading } = useEvent(id);
  console.log(isLoading);

  const registerUserOnEvent = (is_available) => {
    switch (user.role) {
      case USER.ROLES.NINJA:
        createEnrollment(user.ninja_id, event.id, false).catch((error) =>
          notification["error"](error.data?.errors)
        );
        break;

      case USER.ROLES.MENTOR:
        createAvailability(user.mentor_id, event.id, is_available).catch(
          (error) => notification["error"](error.data?.errors)
        );
        break;
    }
  };

  const breakpoints = {
    xs: 24,
    md: 12,
    xl: 8,
    xxl: 6,
  };

  return (
    <AppLayout>
      <Row justify="start">
        <Col {...breakpoints}>
          {isLoading ? (
            <Title level={3}>It is loading</Title>
          ) : (
            <Title level={3}>{event?.name}</Title>
          )}
        </Col>
      </Row>
    </AppLayout>
  );
}

export default withAuth(Event);
